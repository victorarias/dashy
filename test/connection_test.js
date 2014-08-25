const
  Connection = require('../app/connection'),
  spec_helper = require('./spec_helper'),
  sinon = spec_helper.sinon,
  expect = spec_helper.expect;

describe("Connection", function() {
  describe("#token", function() {
    it("returns the connection token", function() {
      var socket = { handshake: { query: { token: "such token" } } };
      var conn = new Connection(socket);

      expect(conn.token).to.equal('such token');
    });

    it("returns undefined when there is no query", function() {
      var socket = { handshake: {} };
      var conn = new Connection(socket);

      expect(conn.token).to.eq(undefined);
    });

    it("returns undefined when there is no token", function() {
      var socket = { handshake: { query: {} } };
      var conn = new Connection(socket);

      expect(conn.token).to.eq(undefined);
    });
  });

  describe('#disconnect', function() {
    it('disconnects the socket', function() {
      var socket = { handshake: {}, disconnect: sinon.spy() };
      var conn = new Connection(socket);

      conn.disconnect();

      expect(socket.disconnect.calledOnce).to.be.true;
    });
  });
});
