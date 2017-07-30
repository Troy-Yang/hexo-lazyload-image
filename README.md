# hexo-lazyload-image

**hexo-lazyload-image** is a hexo plugin which is used to have all images support lazyload automatically. With the help of this functionality, it will improve lots of the loading proformance..

All the lazy-load images only shows up when they are within current viewport.

> Don't worry about lazyload SEO problem, because Google supports it already. we just [Do nothing](http://dinbror.dk/blog/lazy-load-images-seo-problem/).

## Install

```bash
$ npm install hexo-lazyload-image --save
```

## Usage

First add configuration in `_config.yml` from your hexo project.

```yaml
lazyload:
  enable: true # enable or disable this functionality
  onlypost: false # if true, it means only the images from post will support lazyloading, otherwise, means the whole images of your site will use lazyload. 
  loadingImg: ./images/loading.png # loading image will take in the place before the real image shows up.
```

**onlypost**
- if true, only the images from post or page will support lazy-load.
- if false, the whole images of your site will use lazy-load, including the images dist from your theme, but not including the background images from CSS style.

**loadingImg** 
- If you keep the value nothing, then it will use the default loading image.
- IF you want to customize the image, then you need to copy your loading image to your current theme image folder and then change this path to find it. 

Run hexo command.

```bash
$ hexo clean && hexo g
```

## Demo

[troyyang.com](http://troyyang.com)

![image](https://images.troyyang.com/2017-7-30-lazy-load.gif)

## License

MIT