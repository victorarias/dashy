process.env.NODE_ENV = 'test';

const http = require('http');
var app = require('../../app/server.js');
var Browser = require('zombie');

module.exports = function() {
  beforeEach(function() {
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: 'http://localhost:3000'});
    this.browser.silent = true;
  });

  afterEach(function(done) {
    this.server.close(done);
  });
};
