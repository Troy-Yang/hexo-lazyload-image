'use strict';
const fs = require('hexo-fs');
const UglifyJS = require('uglify-js');

module.exports = function (htmlContent) {
    if (!this.config.lazyload || !this.config.lazyload.enable) {
        return htmlContent;
    }

    const loadingImage = this.config.lazyload.loadingImg;
    const sourceImgKey = 'data-original';
    const imgRegExp = /<img(\s*?)src="(.*?)"(.*?)>/gi;
    const lazyLoadPath = __dirname + '/simple-lazyload.js';
    const defaultImagePath = __dirname + '/default-image.json';

    if (!loadingImage) {
        loadingImage = JSON.parse(fs.readFileSync(defaultImagePath)).default;
    }

    let matchedImages = htmlContent.match(imgRegExp);
    if (matchedImages) {
        matchedImages.map(function (imgElStr) {
            if (imgElStr.indexOf(sourceImgKey) > -1)
                return;
            let matchedSourceImgSrc = imgElStr.match(/src="(.*?)"/gi);
            if (matchedSourceImgSrc) {
                let newImgSrc = matchedSourceImgSrc[0].replace('src', sourceImgKey);
                let newImgStr = 'src="' + loadingImage + '" ' + newImgSrc;
                let newImgElStr = imgElStr.replace(matchedSourceImgSrc[0], newImgStr);
                htmlContent = htmlContent.replace(imgElStr, newImgElStr);
            }
        })
    }

    if (htmlContent.indexOf('</body>') > -1) {
        if (!fs.exists(lazyLoadPath)) throw new TypeError(lazyLoadPath + ' not found!');
        let lazyLoadSourceCode = fs.readFileSync(lazyLoadPath, { escape: true });
        let minimizedSourceCode =  UglifyJS.minify(lazyLoadSourceCode, {fromString: true}).code;
        htmlContent = htmlContent.replace('</body>', '<script>' + minimizedSourceCode + '</script></body>');
    }
    return htmlContent;
};
