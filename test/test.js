'use strict';

var path         = require('path');
var expect       = require('chai').expect;
var clearRequire = require('clear-require');
var origCwd      = process.cwd();

function getConfig() {
  clearRequire('convict');
  clearRequire('rc');
  clearRequire('../');
  return require('../');
}

function cd() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(origCwd);
  return process.chdir(path.join.apply(null, args));
}

function setEnv(key, value) {
  process.env[key] = value;
}

var env;

describe('confess', function () {

  beforeEach(function () {
    env = JSON.stringify(process.env);
  });

  afterEach(function () {
    process.env = JSON.parse(env);
  });

  it('should load the default configuration', function () {
    cd('examples', 'simple');
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'development',
      host: 'localhost',
      port: 8000
    });
  });

  it('should honor environment variables', function () {
    cd('examples', 'simple');
    setEnv('PORT', 8080);
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'development',
      host: 'localhost',
      port: 8080
    });
  });

  it('should honor NODE_ENV', function () {
    cd('examples', 'simple');
    setEnv('NODE_ENV', 'production');
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'production',
      host: 'coolwebsite.com',
      port: 80
    });
  });

  it('should honor NODE_ENV=test', function () {
    cd('examples', 'simple');
    setEnv('NODE_ENV', 'test');
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'test',
      host: 'localhost',
      port: 8001
    });
  });

  it('should honor NODE_ENV=local (file doesn\'t exist)', function () {
    cd('examples', 'simple');
    setEnv('NODE_ENV', 'local');
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'local',
      host: 'localhost',
      port: 8000
    });
  });

  it('should utilize the .confessrc', function () {
    cd('examples', 'advanced');
    setEnv('NODE_ENV', 'production');
    var config = getConfig();
    expect(config._instance).to.eql({
      env: 'production',
      host: 'coolwebsite.com',
      port: 80
    });
  });

});
