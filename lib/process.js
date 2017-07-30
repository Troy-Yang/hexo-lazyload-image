'use strict';
function lazyProcess(htmlContent) {
    const loadingImage = this.config.lazyload.loadingImg;
    const sourceImgKey = 'data-original';
    const imgRegExp = /<img(\s*?)src="(.*?)"(.*?)>/gi;
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
        });
    }
    return htmlContent;
}
module.exports.processPost = function (data) {
    data.content = lazyProcess.call(this, data.content);
    return data;
};
module.exports.processSite = function (htmlContent) {
    return lazyProcess.call(this, htmlContent);
};

