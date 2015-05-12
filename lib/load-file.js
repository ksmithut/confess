'use strict';

var fs     = require('fs');
var path   = require('path');
var assign = require('object-assign');

// extension loading specific modules
var cjson = require('cjson');

// This keeps track of the supported extensions and how to import them.
var extensionSupport = {
  js: require,
  json: cjson.load
};

// Checks if the given filepath represents an actual file.
function isFile(filepath) {
  try { return fs.statSync(filepath).isFile(); }
  catch (err) { return false; }
}

// Loads a file, if it exists. If it doesn't, then return the default object or
// empty object
function loadFile(filepath, defaultObj) {
  defaultObj = defaultObj || {};

  if (!isFile(filepath)) { return defaultObj; }

  var extension = path.extname(filepath).replace(/^\./, '');
  var loadByExtension = extensionSupport[extension];

  return assign({}, defaultObj, loadByExtension(filepath));
}

loadFile.supportedExtensions = Object.keys(extensionSupport);

module.exports = loadFile;
