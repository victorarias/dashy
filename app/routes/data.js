const profileMiddleware = require('../middlewares/profile');

module.exports = function(storage, messageBus) {
  return [
    {
      method: "post",
      url: "/data",
      fn: function(req, res) {
        var message = req.body;
        storage.set(req.profile, message.key, message.data);
        messageBus.emit('message', message);
      }
    },
    {
      method: 'get',
      url: '/data/:key',
      middlewares: [ profileMiddleware ],
      fn: function(req, res) {
        res.json({ data: storage.get(req.profile, req.params.key) });
      }
    }
  ]
};
