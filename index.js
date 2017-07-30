'use strict';
 
hexo.extend.filter.register('after_render:html', require('./lib/filter'));
