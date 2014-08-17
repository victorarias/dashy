const Connection = require('./connection')

module.exports = function(app) {
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
