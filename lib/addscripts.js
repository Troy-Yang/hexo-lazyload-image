
const fs = require('hexo-fs');
const UglifyJS = require('uglify-js');
const lazyLoadPath = __dirname + '/simple-lazyload.js';
const thirdPartyFixPath = __dirname + '/third-party-fix.js';

module.exports.addScript = function(htmlContent){
    let injectExtraScript = function (filePath) {
        if (!fs.exists(filePath)) throw new TypeError(filePath + ' not found!');
        let sourceCode = fs.readFileSync(filePath, { escape: true });
        return '<script>' + UglifyJS.minify(sourceCode).code + '</script>';
    };
    let appendScript = function(filePath, htmlContent) {
        let lastIndex = htmlContent.lastIndexOf('</body>');
        return htmlContent.substring(0, lastIndex) + injectExtraScript(filePath) + htmlContent.substring(lastIndex, htmlContent.length);
    }
    if (/<\/body>/gi.test(htmlContent)) {
        htmlContent = appendScript(lazyLoadPath, htmlContent);
        htmlContent = appendScript(thirdPartyFixPath, htmlContent);
    }
    return htmlContent;
};