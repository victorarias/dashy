const
  browserContext = require('./browser_context'),
  expect = require('../spec_helper').expect;

describe('#feature websocket authentication', function() {
  browserContext();

  it("authenticates using the profile token", function(done) {
    var browser = this.browser;

    browser.visit('/?token=123', function() {
      browser.assert.success();
      expect(browser.text('#connection-status')).to.eq('Connected')
      done();
    });
  });
});
