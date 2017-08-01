'use strict';

const fs = require("fs");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const nunjucks = require("nunjucks");
const config = require("./stunjucks.config.js");


const renderTemplate = function(path, templateName, context) {
  console.log("Rendering: " + path);

  context = context || {};

  context.config = config;
  context.buildTime = Date.now();

  renderer = nunjucks.configure(config.templateDir);

  function _render() {
    renderer.render(templateName, context, function(err, html){
      if (err) {
        console.log(err);
      }
      fs.writeFile(htmlDir + path + "index.html", html, 'utf-8');
    });

  }

  fs.access(htmlDir + path, fs.F_OK, function(err) {
    if (!err) {
      _render();
    } else {
      // Make the directory, then render the template
      mkdirp(htmlDir + path, function(err){
        if(err){
          console.log(err);
        } else {
          _render();
        }
      })
    }
  });
}

module.exports = function(){
  // Use rimraf to delete and rerender the site
  rimraf(config.outputDir, function() {
    return routes.map(function(route) {
      return renderTemplate(route.url, route.templateName, route.context);
    });
  });
}
