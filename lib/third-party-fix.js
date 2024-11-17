window.addEventListener('load', function(){
  var imgRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
  var base64ImgRegex = /^data:image\/[a-z\d\-\.\+]+;base64,/;
  var images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));
  images.forEach(function(img) {
    var parentNode = img.parentNode;
    if(parentNode.tagName === 'A' && (imgRegex.test(parentNode.href) || base64ImgRegex.test(parentNode.href))) {
      parentNode.href = img.dataset.original;
    }
  });
});