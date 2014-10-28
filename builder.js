var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var drafts = require('metalsmith-drafts');
var serve = require('metalsmith-serve');
var myth = require('metalsmith-myth');
var sane = require('sane');
var ignore = require('metalsmith-ignore');
var duo = require('duo');
var jade = require('duo-jade');

var watcher = sane('.');

watcher.on('change', buildProject);

var serving = false;

function buildProject() {
  var build = Metalsmith(__dirname)
    .source('src')
    .destination('./build')
    .use(ignore('**/*.js'))
    .use(drafts())
    .use(collections({
      pages: {
        pattern: 'pages/*.md'
      },
      posts: {
        pattern: 'blog/*.md',
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(markdown())
    .use(permalinks(':title'))
    .use(templates('jade'))
    .use(myth());

  if (!serving) {
    build.use(serve({
      port: 8080,
      verbose: true
    }));
    serving = true;
  }

  build.build(function (err, output) {
    if (err) return console.error(err);
    duo(__dirname)
      .entry('app.js')
      .buildTo('build')
      .use(jade())
      .write(function (err) {
        if (!err)     console.log('built');
      });
  });

}

buildProject();
