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
