'use strict';

var path     = require('path');
var convict  = require('convict');
var rc       = require('rc');
var loadFile = require('./lib/load-file');

var APP_NAME = require('./package.json').name;

// This loads the .confessrc
var rcConfig = rc(APP_NAME, {
  extension: 'js',
  schemaPrefix: 'index',
  defaultPrefix: 'default',
  defaultEnv: 'development',
  configDir: 'config',
  cwd: process.cwd()
});

// Check if extension is supported
if (loadFile.supportedExtensions.indexOf(rcConfig.extension) === -1) {
  throw new Error(
    rcConfig.extension + ' is not a supported config extension for `confess`'
  );
}

// The configuration directory for the project

var files = {
  schema: getFilepath(rcConfig.schemaPrefix),
  default: getFilepath(rcConfig.defaultPrefix)
};

// initialize the convict object
var config = convict(loadFile(files.schema, {
  env: {
    doc: 'The application environment',
    format: String,
    default: rcConfig.defaultEnv,
    env: 'NODE_ENV',
    arg: 'env'
  }
}));

// load the default configuration
config.load(loadFile(files.default));

// load the environment configuration
files.env = getFilepath(config.get('env'));
config.load(loadFile(files.env));

// validate
config.validate();

// export
module.exports = config;

function getFilepath(basename) {
  return path.join(
    rcConfig.cwd,
    rcConfig.configDir,
    basename + '.' + rcConfig.extension
  );
}
