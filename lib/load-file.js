'use strict';

var path   = require('path');
var assign = require('object-assign');
var isFile = require('./is-file');

// extension loading specific modules
var cjson = require('cjson');

// This is the hash to keep track of
var supportedExtensions = {
  js: require,
  json: cjson.load
};

// Loads a file, if it exists. If it doesn't, then return the default object or
// empty object
function loadFile(filepath, defaultObj) {
  defaultObj = defaultObj || {};

  if (!isFile(filepath)) { return defaultObj; }

  var extension = path.extname(filepath).replace(/^\./, '');
  var contents = supportedExtensions[extension](filepath);

  return assign({}, defaultObj, contents);
}

loadFile.supportedExtensions = supportedExtensions;

module.exports = loadFile;
