# hexo-lazyload-image

**hexo-lazyload-image** is a hexo plugin which is used to have all images support lazyload automatically. With the help of this functionality, it will improve lots of the loading proformance..

All the lazy-load images only shows up when they are within current viewport.

## Install

```bash
$ npm install hexo-lazyload-image --save
```

## Usage

First add configuration in `_config.yml` from your hexo project.

```yaml
lazyload:
  enable: true
  onlypost: false # optional
  loadingImg: # optional eg ./images/loading.gif
  isSPA: false # optional
  preloadRatio: 3 # optional, default is 1
```
**onlypost**
- If true, only the images from post or page will support lazy-load.
- If false, the whole images of your site will use lazy-load, including the images dist from your theme, but not including the background images from CSS style.

**loadingImg** 
- If you keep the value nothing (by default), then it will use the default loading image.
- If you want to customize the image, then you need to copy your loading image to your current theme image folder and then change this path to find it. 

**isSPA**
For performance considering, **isSPA** is added. If your theme is a SPA page, please set it as true to make the lazy loading works, 
- If true, searching for each image during scrolling to support SPA page, 
- If false (default value), the performance would be the best.

**preloadRatio**
This option is for a better experience and default value is 1. This ratio means to pre-load the images where is within how many ratios than current screen size, even these images are not in current view point.

**Helper APIs**
```
window.imageLazyLoadSetting = {
  processImages, // core method to process lazyload image
  onImageLoaded: // this will be triggered after any real image loaded
};
```

### Low Quality Image Placeholder (LQIP)
This plugin is not going to provide any complex strategy like hexo compiling to generate placeholder image or fetch image size. But it does support already if you specify both the placeholde image and original image as below:
```
<img src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300,bl-30,q-50" data-original="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" />
```
![image](https://images.troyyang.com/lqip.gif)

### specify **bg-lazy** for background image coming from html or css
we can also support the lazy process if specify a attribute on **any** tag in both markdown or html
```
<div bg-lazy style="background-image: url('https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-600,h-400'); height: 400px; max-width: 600px;"></div>
```

### specify **no-lazy** for specify image
we can also disable the lazy process if specify a attribute on img tag in both markdown or html
```
<img no-lazy src="abc.png" />
```

Run hexo command.

```bash
$ hexo clean && hexo g
```

### disable lazy for specify post
To disable the lazy loading of images in a specific post, you can add `lazyimage: no` to the post's front matter header. However, this option will only work if the `onlypost` setting in your site's configuration file is set to true. 
```yaml
# In your post's front matter
---
title: My Post with Non-Lazy Loaded Images
lazyimage: no
---

# In your site's config file
onlypost: true
```

## Test
I've test it manually with some popular themes like landscape(official), material, next, jacman and myself theme [hexo-theme-twentyfifteen-wordpress](https://github.com/Troy-Yang/hexo-theme-twentyfifteen-wordpress), and yours I believe!

Enjoy it!
## Demo

[troyyang.com](http://troyyang.com)

![image](https://images.troyyang.com/2017-7-30-lazy-load.gif)

## License

MIT
