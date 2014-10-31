/**
 * Module dependencies
 */

var linearConversion = require('bmcmahen/linear-conversion');
var transformProperty = require('component/transform-property');
var ease = require('component/ease');

// cache nav header el
var header = document.querySelector('.navigation');

// create conversion fns
var conversion = linearConversion([0, 200], [1, 0]);
var translateConversion = linearConversion([0, 200], [0, -100]);

// bind throttled scroll event
if (header) {
  setInterval(updatePage, 10);
  updatePage();
}

var scrollTop = window.scrollY || document.documentElement.scrollTop;

function updatePage() {
  window.requestAnimationFrame(function () {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    animateElements();
  });
}

function animateElements() {
  // opacity
  var opacity = conversion(scrollTop);
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;
  if (opacity >= 0 && opacity <= 1){
    header.style.opacity = ease.inOutQuad(opacity.toFixed(2));
  }

  // translate
  var pos = translateConversion(scrollTop);
  if (pos > 0) pos = 0;
  if (pos < -150) pos = -150;
  if (pos <= 0 && pos >= -150){
    header.style[transformProperty] = 'translateY('+ pos + 'px)';
  }

}

// function easeInOutQuad(t, b, c, d) {
//   return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
// }
