/**
 * Module dependencies
 */

var linearConversion = require('bmcmahen/linear-conversion');
var events = require('component/events');
var Fade = require('bmcmahen/cross-fade');
var drawImage = require('bmcmahen/canvas-image-cover');
var throttle = require('component/per-frame');


// translate scrollTop to opacity
var conversion = linearConversion([0, 250], [0, 1]);


/**
 * Fade Image
 * @param {Canvas} canvas
 * @param {String} url
 * @param {String} url2
 */

function FadeImage(canvas, url, url2){

  this.canvas = canvas;

  // show loading animation, or nicely fade from black to our image
  this.loadImages(url, url2, function(img, img2){
    this.img = img;
    this.img2 = img2;

    canvas.width = window.innerWidth;
    canvas.height = canvas.clientHeight;

    this.fade = new Fade(canvas, img, img2);
    this.fade.on('draw', function(){
      drawImage.apply(null, arguments);
    });
    this.draw();
    canvas.classList.add('loaded');
  }.bind(this));
  this.bind();
}

/**
 * Bind events
 * @return {FadeImage}
 */

FadeImage.prototype.bind = function(){
  this.throttledDraw = window.setInterval(this.draw.bind(this), 10);
  this.throttledResize = throttle(this.resize.bind(this));
  this.events = events(window, this);
  this.events.bind('resize', 'throttledResize');
  return this;
};

/**
 * Unbind events
 * @return {FadeImage}
 */

FadeImage.prototype.close = function(){
  this.events.unbind();
  window.clearInterval(this.throttledDraw);
  return this;
};

/**
 * Fade image
 * @return {FadeImage}
 */

FadeImage.prototype.draw = function(){
  window.requestAnimationFrame(function () {
    var top = window.scrollY || document.documentElement.scrollTop;
    var conv = conversion(top);
    if (conv >= 0 && conv < 600 && this.fade) {
      this.fade.transition(conv);
    }
  }.bind(this));
  return this;
};

/**
 * on window resize, update our header
 * @return {FadeImage}
 */

FadeImage.prototype.resize = function(){
  if (this.fade) {
    this.fade.setWidth(window.innerWidth);
    this.fade.setHeight(this.canvas.clientHeight);
  }
  return this;
};

/**
 * Load all images and callback when done
 * @param  {String}   url
 * @param  {String}   url2
 * @param  {Function} fn
 */

FadeImage.prototype.loadImages = function(url, url2, fn){
  var img = new Image();
  var img2 = new Image();

  img.src = url;
  img2.src = url2;

  this.loaded = 0;

  img.onload = img2.onload = function(){
    this.loaded++;
    if (this.loaded > 1) {
      fn(img, img2);
    }
  }.bind(this);
};



function boot() {
  var container = document.getElementById('header-image');
  var img1 = container.getAttribute('data-img1');
  var img2 = container.getAttribute('data-img2');
  if (!img1 || !img2) {
    throw new Error('images not found');
  }

  new FadeImage(container, img1, img2);
}

boot();
