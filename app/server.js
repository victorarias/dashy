const
  express = require('express')
  app = express(),
  httpServer = require('http').Server(app),
  messageBus = require('./message_bus')(app, require('socket.io')),
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

require('./handlers/data')(app, storage, messageBus);

app.get('/', profileMiddleware, function(req, res) {
  res.render('index', { token: req.query.token });
});

if(!module.parent) {
  messageBus.start(httpServer);
  var port = process.env.PORT || 3000;
  httpServer.listen(port, function() {
    console.log("Listening at " + port);
  });
}
