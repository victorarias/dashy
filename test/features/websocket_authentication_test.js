const
  browserContext = require('./browser_context'),
  assert = require('assert');

describe('#feature websocket authentication', function() {
  browserContext();

  it("authenticates using the profile token", function(done) {
    var browser = this.browser;

    browser.visit('/?token=123', function() {
      browser.assert.success();
      assert.equal(browser.text('#connection-status'), 'Connected')
      done();
    });
  });
});
