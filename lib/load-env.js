'use strict';

function jsonToEnv(env, json, prefix) {
  prefix = prefix ? prefix + '_' : '';

  Object.keys(json).forEach(function (envName) {
    var envValue = env[envName];
    var newPrefix = prefix + envName;
    if (typeof envValue === 'object') {
      return jsonToEnv(env, envValue, newPrefix);
    }
    env[newPrefix] = envValue;
  });
}


