var browserContext = require('./browser_context');

describe('#feature profile authentication', function() {
  browserContext();

  it('respond with 403 forbidden without a token', function(done) {
    var browser = this.browser;
    browser.silent = true;

    browser.visit('/', function() {
      browser.assert.status(403);
      done();
    });
  });
});
