module.exports = function(app) {
  function Connection(socket) {
    function getToken() {
      if(!socket.handshake.query) return undefined;
      if(!socket.handshake.query.token) return undefined;

      return socket.handshake.query.token;
    };

    return {
      token: getToken(),
      close: function() {
        socket.disconnect();
      }
    };
  }
  function onConnection(socket) {
    var conn = new Connection(socket);

    if(conn.token !== "123") {
      conn.close();
    }
  };

  return {
    start: function(httpServer) {
      this.io = require('socket.io')(httpServer);

      this.io.on('connection', onConnection);
    },
    emit: function(message, payload) {
      this.io.emit(message, payload);
    }
  };
}
