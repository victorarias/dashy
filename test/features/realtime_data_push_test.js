const
  browserContext = require('./browser_context'),
  expect = require('../spec_helper').expect;

describe('#feature realtime data push', function() {
  browserContext();

  it("pushes data to connected clients", function(done) {
    var browser = this.browser;
    var app = this.app;

    // set initial data, fetch by async xhr request after load
    app.storage.set('developer', '_worker_data_key_', 'much data');

    browser.visit('/?token=123', function() {
      browser.assert.success();
      assertConnected(browser);

      expectValueToBeRendered(browser, 'much data');

      // push data
      var payload = { key: '_worker_data_key_', data: 'such realtime', profile: 'developer' };
      pushData(app, payload);

      browser.wait(function() {
        expectValueToBeRendered(browser, 'such realtime');
        done();
      });
    });
  });

  function pushData(app, payload) {
    app.messageBus.emit('message', payload);
  }

  function assertConnected(browser) {
    expect(browser.text('#connection-status')).to.eq('Connected')
  }

  function expectValueToBeRendered(browser, value) {
      expect(browser.text('.test-widget')).to.eq(value);
  }
});
