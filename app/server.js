const
  express = require('express')
  app = express(),
  httpServer = require('http').Server(app),
  messageBus = require('./message_bus')(app),
  path = require('path'),
  bodyParserMiddleware = require('body-parser'),
  profileMiddleware = require('./middlewares/profile'),
  storage = {};

module.exports = app;
app.messageBus = messageBus;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParserMiddleware.json());

app.get('/', profileMiddleware, function(req, res) {
  res.render('index', { token: req.query.token });
});

app.post('/data', function(req, res) {
  var message = req.body;
  storage[message.key] = message.data;
  messageBus.emit('message', message);
});

app.get('/data/:key', function(req, res) {
  res.json({ data: storage[req.params.key] });
});

if(!module.parent) {
  messageBus.start(httpServer);
  httpServer.listen(process.env.PORT || 3000);
}
