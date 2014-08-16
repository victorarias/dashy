process.env.NODE_ENV = 'test';

const http = require('http');
var app = require('../../app/server.js');
var Browser = require('zombie');

describe('#feature profile authentication', function() {
  beforeEach(function() {
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: 'http://localhost:3000'});
  });

  afterEach(function(done) {
    this.server.close(done);
  });

  it('respond with 403 forbidden without a token', function(done) {
    var browser = this.browser;
    browser.visit('/', function() {
      browser.assert.status(403);
      done();
    });
  });

});
