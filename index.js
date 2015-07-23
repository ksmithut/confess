'use strict';

var path     = require('path');
var convict  = require('convict');
var loadRc   = require('rc');
var loadFile = require('./lib/load-file');

var APP_NAME = require('./package.json').name;

// This loads the .confessrc
var rc = loadRc(APP_NAME, {
  extension: 'js',
  schemaPrefix: 'index',
  defaultPrefix: 'default',
  defaultEnv: 'development',
  configDir: 'config',
  cwd: process.cwd(),
  envFile: '.env'
});

var EXTENSION = rc.extension;
var CONFIG_DIR = path.resolve(rc.cwd, rc.configDir);
var SCHEMA_PATH = path.join(CONFIG_DIR, rc.schemaPrefix + '.' + EXTENSION);
var DEFAULT_PATH = path.join(CONFIG_DIR, rc.defaultPrefix + '.' + EXTENSION);

// Check if extension is supported
if (!loadFile.supportedExtensions[EXTENSION]) {
  throw new Error(
    EXTENSION + ' is not a supported config extension for `confess`'
  );
}

// initialize the convict object
var config = convict(loadFile(SCHEMA_PATH, {
  env: {
    doc: 'The application environment',
    format: String,
    default: rc.defaultEnv,
    env: 'NODE_ENV',
    arg: 'env'
  }
}));

// load the default configuration
config.load(loadFile(DEFAULT_PATH));

// load the environment configuration
var ENV_PATH = path.join(CONFIG_DIR, config.get('env') + '.' + EXTENSION);
config.load(loadFile(ENV_PATH));

// validate
config.validate();

// export
module.exports = config;
