'use strict';

// replace with require('confess');
var config = require('../../');
var http = require('http');

var PORT = config.get('port');
var HOST = config.get('host');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(PORT)
  .on('listening', function () {
    console.log('Server listening at %s:%s', PORT, HOST);
  });
