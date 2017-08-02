'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
var rimraf = require('rimraf');


const renderTemplate = function(config, url, templateName, context) {

  var context = context || {};

  context.config = config;
  context.buildTime = Date.now();
  var templateDir = config.templateDir.replace(/\/+$/, "");

  nunjucks.configure(templateDir);
  function _render() {
    nunjucks.render(templateName, context, function(err, html){
      if (err) {
        console.error(err);
      }
      fs.writeFile(config.outputDir + url + "index.html", html, 'utf-8');
    });
  }

  fs.access(config.outputDir + url, fs.F_OK, function(err) {
    console.log("Rendering " + url);
    if (!err) {
      _render();
    } else {
      // Make the directory, then render the template
      mkdirp(config.outputDir + url, function(err){
        if(err){
          console.error(err);
        } else {
          _render();
        }
      })
    }
  });
}

module.exports = function(config){
  config = config | './stunjucks.config.js'
  if (Object.prototype.toString.call(config) === "[object String]"){
    config = require(config);
  }
  // clear existing build if any
  rimraf.sync('./test/static/', {});
  config.routes.map(function(route) {
    renderTemplate(config, route.url, route.templateName, route.context);
  });
}
