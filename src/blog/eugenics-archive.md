---
template: post.jade
pageName: blogPost
title: Introducing the Eugenics Archive
---
As web applications become increasingly large and complex, we inevitably need tools to manage our client-side code. Instead of writing one huge script file, we want to be able to split up our code into multiple, distinct modules. We want to encourage code-reuse, and be able to easily import and add various dependencies to our projects -- whether a UI-component like a dropdown menu, or a DOM manipulation library like jQuery. And it's not just Javascript that we want to organize -- it's also the css, html templates, fonts, images, and other static resources that are part of any web application. Component provides a mechanism to do all of the above:

  - organize your application around multiple, discrete modules
  - easily import modules that others have published, to be used as dependencies.
  - automatically combine all of your modules into a single javascript and css file for use at runtime.

```javascript
var ben = 'a human of some sort';

function doGood(because) {
  if (because === 'you should') {
    alert('okay');
  }
}
```

## Structuring your application

Our basic application structure involves three main parts: (1) a main `component.json` that defines where our modules are contained. (2) a directory containing those modules, and (3) a main `boot` module, which contains the logic for initially starting our application.

    .
    |-- component.json
    |-- lib
      |-- boot
        |-- component.json
        |-- index.js
      |-- login
        |-- component.json
        |-- index.js
        |-- index.css
        |-- template.html

Within our example application, we have our main `component.json` file which tells component to look within the `lib` path to find all of our modules. We have also defined a local dependency -- our `boot` module, which itself is a folder contained within our `lib` path.

    {
      "name": "myapp",
      "description": "a simple app to demonstrate component",
      "paths": ["lib"],
      "local": ["boot"]
    }

Our `boot` module defines the boot procedure for our application. It and all of the modules contained within `lib` are themselves components; that is, they contain their own `component.json` which defines their own dependencies, both local and external. Let's look at our boot's `component.json`.

    {
      "name": "boot",
      "description": "start my app",
      "dependencies": {
        "bmcmahen/transit": "*"
      },
      "main": "index.js",
      "scripts": [
        "index.js"
      ],
      "local": [
        "login"
      ]
    }

This `boot` component looks much like any other component in our application. It has a name, description, and it defines all of our dependencies. The `dependencies` key defines external dependencies installed from github, such as `component/classes`, `bmcmahen/transit`, etc. The `local` key defines dependencies contained within your application -- in this case, our login component which we want to load when our application first boots. Let's take a look at our `index.js` file, which contains our boot procedure.

    // import our external dependencies
    var router = require('transit');

    // import our local dependencies.
    require('login');

    // start our router
    router.listen('/');
    router.start();

When our application boots, we want to import our router so that we can listen for URL changes. We also want to import our login module, which itself listens for the appropriate URL and renders a login form when requested. Again, our login module defines its own `component.json` file, with its own external and local dependencies, templates, styles, etc.

    {
      "name": "login",
      "description": "login form",
      "dependencies": {
        "bmcmahen/transit": "*"
      },
      "development": {},
      "main": "index.js",
      "scripts": [
        "index.js"
      ],
      "styles": [
        "login.css"
      ],
      "templates": [
        "template.html"
      ]
    }

And our `index.js` file contains logic particular to this module.

    var router = require('transit');

    // When the user goes to /login, we render
    // our login form.

    router('/login', function(){
      // render our login form
    });

## Building the Application

Finally, we need to actually install all of our external dependencies and build our application into parts that we can easily serve alongside our html document. Navigate to your application folder where root `component.json` file is contained. Use the `component` command-line tools to install all of the dependencies for your entire application.

    $ component install

When installation finishes, you need to build the files that will be served to the client. Again, in the terminal:

    $ component build

This create a single `build.js` and `build.css` file within the `build` folder. You need to attach these to the HTML documents that you intend to serve to the user. At the end of your HTML file, import `build.js` and require the boot module to initiate the booting procedure.

    <html>
    <head>
     <link href='build/build.css' rel='stylesheet'>
    </head>
    <body>
     <script src='build/build.js'></script>
     <script> require('boot'); </script>
    </body>
