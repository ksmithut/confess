# confess

[![io.js compatibility](https://img.shields.io/badge/io.js-compatible-brightgreen.svg?style=flat)](https://iojs.org/)
[![node.js compatibility](https://img.shields.io/badge/node.js-compatible-brightgreen.svg?style=flat)](https://nodejs.org/)

[![NPM version](http://img.shields.io/npm/v/confess.svg?style=flat)](https://www.npmjs.org/package/confess)
[![Dependency Status](http://img.shields.io/david/ksmithut/confess.svg?style=flat)](https://david-dm.org/ksmithut/confess)
[![Dev Dependency Status](http://img.shields.io/david/dev/ksmithut/confess.svg?style=flat)](https://david-dm.org/ksmithut/confess#info=devDependencies&view=table)
[![Code Climate](http://img.shields.io/codeclimate/github/ksmithut/confess.svg?style=flat)](https://codeclimate.com/github/ksmithut/confess)
[![Build Status](http://img.shields.io/travis/ksmithut/confess/master.svg?style=flat)](https://travis-ci.org/ksmithut/confess)
[![Coverage Status](http://img.shields.io/codeclimate/coverage/github/ksmithut/confess.svg?style=flat)](https://codeclimate.com/github/ksmithut/confess)

`confess` is a configuration wrapper around
[`convict`](https://github.com/mozilla/node-convict).

### Deprecated: Opt to use [`convict`](https://github.com/mozilla/node-convict)
### directly. If you would like this project to remain, I can transfer rights
### over to someone who wishes to maintain it, otherwise, I will unpublish it.

## The problem

Setting up configuration and using configuration seem to be two different
concerns approached by other configuration modules. Convict is a module that has
(in my opinion) done a really good job at setting up configuration. It's
extensible, easy to integrate with in any system, and can be customized to do
just about anything the other configuration loaders can do. Using it, though,
can be a pain. You create a `config.js` or `config/index.js` or something that
loads convict and configures your configuration. That's the good part. But when
you want to use your configuration, it's only available if you `require()` it
from wherever you are in your file system, which could requires a lot of `../`.

This module makes abstracts my most common use cases of setting up configuration
with convict, with the convenience of use a require without paths.

# Installation

```bash
npm install --save confess
```

# Usage

In the root of your project create a folder called `config/`.

In this folder, there will be 3 classes of files:

* **Schema definition file** - This is the file that defines the schema of the
main configuration options. This file should export an object that you would use
to define your `convict` configuration. Documentation on how to set up the
schema can be found [here](https://github.com/mozilla/node-convict#the-schema).
The default name for this file is `index.js`.

* **Default configuration file** - This file gets loaded and merged into the
config object using `convict`'s
[`.load()`](https://github.com/mozilla/node-convict#configloadobject) method.
The default name for this file is `default.js`.

* **Environment configuration files** - The default schema that gets loaded
includes and environment configuration that you can set with an environment
variable (`NODE_ENV`) or with a flag (`--env`). The default environment is
`development` so it loads `development.js`. It is recommended that you create
multiple environment configuration files, such as `test` and `production`. Any
configuration options set in these files with override those in default and the
schema defaults.

The object that gets returned is the `convict` config object. So to get a config
value, just use it like you would in `convict`.

```js
'use strict';

var config = require('confess');

config.get('port');
config.get('session.secret');

```

For more documentation on things you can do with the `convict` config object,
see [their documentation](https://github.com/mozilla/node-convict);

# Configuration

You can override things like the folder and schema filename by putting a
`.confessrc` file in the root of your project.

```json
{
  "extension": "js", // can be js or json
  "schemaPrefix": "index",
  "defaultPrefix": "default",
  "defaultEnv": "development",
  "configDir": "config", // relative dir to cwd
  "cwd": "" // This defaults to what process.cwd() is
}
```

If anyone would like to add more file extension support, submit an issue or pull request. I stuck with just `js` and `json` because this is nodejs/iojs.

# Examples

To view example folder/file structures, view the
[examples directory](https://github.com/ksmithut/confess/tree/master/examples).
