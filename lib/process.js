'use strict';

const fs = require('hexo-fs');

function lazyProcess(htmlContent) {
    let defaultImagePath = __dirname + '/default-image.json';
    let loadingImage = this.config.lazyload.loadingImg;

    if (!loadingImage) {
        loadingImage = JSON.parse(fs.readFileSync(defaultImagePath)).default;
    }

    return htmlContent.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2) {
        // might be duplicate
        if(/data-original/gi.test(str)){
            return str;
        }
        if(/src="data:image(.*?)/gi.test(str)) {
            return str;
        }
        if(/no-lazy/gi.test(str)) {
            return str;
        }
        return str.replace(p2, loadingImage + '" data-original="' + p2);
    });
}
module.exports.processPost = function (data) {
    if (data.lazyimage !== 'no') {
        data.content = lazyProcess.call(this, data.content);
    }
    return data;
};
module.exports.processSite = function (htmlContent) {
    return lazyProcess.call(this, htmlContent);
};

