#!/usr/bin/env node

'use strict';

var stunjucks = require('./index.js');

// default
var fileName = 'stunjucks.config.js';
if (process.argv.length > 2) {
    fileName = process.argv[2]
}
stunjucks(fileName);
