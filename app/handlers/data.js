module.exports = function(router, storage, messageBus) {
  router.post('/data', function(req, res) {
    var message = req.body;
    storage[message.key] = message.data;
    messageBus.emit('message', message);
  });

  router.get('/data/:key', function(req, res) {
    res.json({ data: storage[req.params.key] });
  });
}
