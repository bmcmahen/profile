// var page = require('visionmedia/page.js');
// var onload = require('component/onload');

// page('/', function () {
//   document.body.classList.remove('show-projects');
// });
//
// page('/projects', function (ctx, next) {
//   document.body.classList.add('show-projects');
// });
//
// page();
//
//
// setTimeout(function () {
//   document.body.classList.add('fully-loaded');
// }, 10000);

var Tip = require('component/tip');
var throttle = require('component/per-frame');
var linearConversion = require('bmcmahen/linear-conversion');

var els = document.querySelectorAll('a[title]');

for(var i = 0, el; el = els[i]; i++) {
  var val = el.getAttribute('title');
  var tip = new Tip(val, { delay: 1});
  el.setAttribute('title', '');
  tip.cancelHideOnHover();
  tip.position('bottom');
  tip.attach(el);
  tip.effect('fade');
}

var header = document.querySelector('.navigation');
if (!header) return;

var conversion = linearConversion([0, 200], [1, 0]);
var scaleConversion = linearConversion([0, 200], [1, 0.8]);
var translateConversion = linearConversion([0, 200], [0, -70]);
window.addEventListener('scroll', throttle(onscroll), false);

var doOpacity = document.body.classList.contains('about');

function onscroll() {
  var top = window.scrollY || document.documentElement.scrollTop;

    var opacity = conversion(top);
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;
    header.style.opacity = opacity;


  var pos = translateConversion(top);
  if (pos > 0) pos = 0;
  if (pos < -150) pos = -150;
  header.style.transform = 'translateY('+ pos + 'px)';
  // scale('+ scaleConversion(top) + ')
}

onscroll();
