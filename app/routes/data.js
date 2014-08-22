module.exports = function(dependencyContainer) {
  var storage = dependencyContainer.storage,
    messageBus = dependencyContainer.messageBus;

  return [
    {
      method: "post",
      url: "/data",
      fn: function(req, res) {
        var message = req.body;
        storage[message.key] = message.data;
        messageBus.emit('message', message);
      }
    },
    {
      method: 'get',
      url: '/data/:key',
      fn: function(req, res) {
        res.json({ data: storage[req.params.key] });
      }
    }
  ]
};
