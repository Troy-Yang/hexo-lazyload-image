window.addEventListener('load', function(){
  var imgRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
  var base64ImgRegex = /^data:image\/[a-z]+;base64,/;
  var images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));
  images.forEach(function(img) {
    var parentNode = img.parentNode;
    if(parentNode.tagName === 'A' && (parentNode.href.match(imgRegex) || parentNode.href.match(base64ImgRegex))) {
      parentNode.href = img.dataset.original;
    }
  });
});