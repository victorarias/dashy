const Connection = require('./connection'),
  Profile = require('./profile');

module.exports = function(io) {
  function onConnection(socket) {
    var conn = new Connection(socket);
    var profile = Profile.get(conn.token);

    if(profile) {
      socket.join(profile);
    } else {
      conn.disconnect();
    }
  };

  return {
    start: function(httpServer) {
      this.io = io(httpServer);
      this.io.on('connection', onConnection);

      return this;
    },
    emit: function(message, content) {
      this.io.to(content.profile).emit(message, content);
    }
  };
}
