
const fs = require('hexo-fs');
const UglifyJS = require('uglify-js');
const lazyLoadPath = __dirname + '/simple-lazyload.js';
const thirdPartyFixPath = __dirname + '/third-party-fix.js';

module.exports.addScript = function(htmlContent){
    let injectSetting = function () {
        return `<script>
            window.imageLazyLoadSetting = {
                processImages: null,
                processImagesThrottle: null,
            };
        </script>`;
    };
    let injectExtraScript = function (filePath) {
        if (!fs.exists(filePath)) throw new TypeError(filePath + ' not found!');
        let sourceCode = fs.readFileSync(filePath, { escape: true });
        return '<script>' + UglifyJS.minify(sourceCode).code + '</script>';
    };
    let appendScript = function(content, htmlContent) {
        let lastIndex = htmlContent.lastIndexOf('</body>');
        return htmlContent.substring(0, lastIndex) + content + htmlContent.substring(lastIndex, htmlContent.length);
    };
    if (/<\/body>/gi.test(htmlContent)) {
        if(this.config.lazyload.exportAPI) {
            htmlContent = appendScript(injectSetting(), htmlContent);
        }
        if(!this.config.lazyload.disableAutoFix) {
            htmlContent = appendScript(injectExtraScript(thirdPartyFixPath), htmlContent);
        }
        htmlContent = appendScript(injectExtraScript(lazyLoadPath), htmlContent);
    }
    return htmlContent;
};