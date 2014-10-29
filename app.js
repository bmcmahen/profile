var page = require('visionmedia/page.js');
var onload = require('component/onload');

page('/', function () {
  document.body.classList.remove('show-projects');
});

page('/projects', function (ctx, next) {
  document.body.classList.add('show-projects');
});

page();


setTimeout(function () {
  document.body.classList.add('fully-loaded');
}, 10000);
