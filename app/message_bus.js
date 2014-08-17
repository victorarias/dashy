module.exports = function(app) {
  return {
    start: function(httpServer) {
      this.io = require('socket.io')(httpServer);
    },
    emit: function(message, payload) {
      this.io.emit(message, payload);
    }
  };
}
