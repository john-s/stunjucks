#!/usr/bin/env node

'use strict';

var stunjucks = require('./index.js');

// default file name
var fileName = 'stunjucks.config.js';
if (process.argv.length > 2) {
    fileName = process.argv[2]
}
var currentDir = process.cwd();
// only call stunjucks if the config is loaded successfully
var successfulConfig = true;
try {
    config = require(currentDir + '/' + fileName);
} catch (err) {
    successfulConfig = false;
    console.error('Could not load config ' + fileName + ': ' + e.message)
}
if (successfulConfig){
    stunjucks(config);
}
