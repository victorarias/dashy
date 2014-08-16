const
  app = require('express')(),
  http = require('http'),
  io = require('socket.io')(http),
  bodyParserMiddleware = require('body-parser'),
  profileMiddleware = require('./middleware/profile'),
  storage = {};

app.use(bodyParserMiddleware.json());

app.get('/', profileMiddleware, function(req, res) {
  res.sendfile('index.html');
});

app.post('/data', function(req, res) {
  var message = req.body;
  storage[message.key] = message.data;
  io.emit('message', message);
});

app.get('/data/:key', function(req, res) {
  res.json({ data: storage[req.params.key] });
});

module.exports = app;

if(!module.parent) {
  http.createServer(app).listen(process.env.PORT || 3000);
}
