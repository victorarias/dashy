const
  Connection = require('../app/connection'),
  assert = require('assert'),
  sinon = require('sinon');

describe("Connection", function() {
  describe("#token", function() {
    it("returns the connection token", function() {
      var socket = { handshake: { query: { token: "such token" } } };
      var conn = new Connection(socket);

      assert.equal(conn.token, "such token");
    });

    it("returns undefined when there is no query", function() {
      var socket = { handshake: {} };
      var conn = new Connection(socket);

      assert.equal(conn.token, undefined);
    });

    it("returns undefined when there is no token", function() {
      var socket = { handshake: { query: {} } };
      var conn = new Connection(socket);

      assert.equal(conn.token, undefined);
    });
  });

  describe('#close', function() {
    it('closes the socket', function() {
      var socket = { handshake: {}, disconnect: sinon.spy() };
      var conn = new Connection(socket);

      conn.close();

      assert(socket.disconnect.calledOnce);
    });
  });
});
