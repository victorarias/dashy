process.env.NODE_ENV = 'test';

const http = require('http');
var app = require('../../app/server.js');
var Browser = require('zombie');

module.exports = function() {
  beforeEach(function() {
    var httpServer = http.Server(app);
    this.server = httpServer.listen(3000);

    app.messageBus.start(httpServer);

    this.browser = new Browser({ site: 'http://127.0.0.1:3000', debug: false});
    this.app = app;
  });

  afterEach(function(done) {
    if(this.browser.window && this.browser.window.socket) {
      this.browser.window.socket.disconnect(true);
    }
    this.server.close(done);
  });
};
