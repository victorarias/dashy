const Connection = require('./connection'),
  profileMiddleware = require('./middlewares/profile');

//TODO: extract profile to its own file/type

module.exports = function(app, io) {
  function onConnection(socket) {
    var conn = new Connection(socket);
    var profile = profileMiddleware.TOKENS[conn.token];

    if(profile) {
      socket.join(profile);
    } else {
      conn.close();
    }
  };

  return {
    start: function(httpServer) {
      this.io = io(httpServer);
      this.io.on('connection', onConnection);
    },
    emit: function(message, payload) {
      this.io.to(payload.profile).emit(message, payload);
    }
  };
}
