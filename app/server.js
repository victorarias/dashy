const
  express = require('express')
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  path = require('path'),
  bodyParserMiddleware = require('body-parser'),
  profileMiddleware = require('./middlewares/profile'),
  storage = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParserMiddleware.json());

app.get('/', profileMiddleware, function(req, res) {
  res.render('index');
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
  http.listen(process.env.PORT || 3000);
}
