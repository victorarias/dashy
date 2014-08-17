module.exports = function Connection(socket) {
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
