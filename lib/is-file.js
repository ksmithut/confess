'use strict';

var fs = require('fs');

// Checks if the given filepath represents an actual file.
module.exports = function isFile(filepath) {
  try { return fs.statSync(filepath).isFile(); }
  catch (err) { return false; }
};
