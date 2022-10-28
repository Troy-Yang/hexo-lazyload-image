(function (window) {
    window.imageLazyLoadSetting.processImages = processImages;
    var isSpa = window.imageLazyLoadSetting.isSPA;
    var preloadRatio = window.imageLazyLoadSetting.preloadRatio || 1;
    var images = collectLazyImages();


    function collectLazyImages() {
        var images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));
        var bgImages = Array.prototype.slice.call(document.querySelectorAll('[bg-lazy]'));
        return images.concat(bgImages);
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.bottom >= 0
            && rect.left >= 0
            && rect.top <= (window.innerHeight * preloadRatio || document.documentElement.clientHeight * preloadRatio)
        );
    }
    function loadImage(el, fn) {
        // process lazy background image
        if(el.hasAttribute('bg-lazy')) {
            el.removeAttribute('bg-lazy');
            fn ? fn() : null;
            return;
        }
        // process normal image
        var img = new Image()
            , src = el.getAttribute('data-original');
        img.onload = function () {
            el.src = src;
            el.removeAttribute('data-original');
            fn ? fn() : null;
        };
        if(el.src!== src) img.src = src;
    }

    function processImages() {
        if(isSpa) {
            images = collectLazyImages();
        }
        for (var i = 0; i < images.length; i++) {
            if (elementInViewport(images[i])) {
                (function(index){
                    var loadingImage = images[index];
                    loadImage(loadingImage, function () {
                        images = images.filter(function(t) {
                            return loadingImage !== t;
                        });
                        window.imageLazyLoadSetting.onImageLoaded && window.imageLazyLoadSetting.onImageLoaded(loadingImage);
                    });
                })(i);
            }
        };
    }

    function lazyLoad() {
        clearTimeout(processImages.tId);
        processImages.tId = setTimeout(processImages, 500);
    }

    processImages();

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
})(this);
