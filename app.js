var page = require('visionmedia/page.js');
var onload = require('component/onload');

page('/', function () {
  document.body.classList.remove('show-projects');
});

page('/projects', function (ctx, next) {
  console.log('show projects');
  document.body.classList.add('show-projects');
});

page();
