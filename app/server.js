const
  express = require('express')
  app = express(),
  httpServer = require('http').Server(app),
  messageBus = require('./message_bus')(app, require('socket.io')),
  path = require('path'),
  bodyParserMiddleware = require('body-parser'),
  storage = {};

module.exports = app;
app.messageBus = messageBus;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParserMiddleware.json());

var DIContainer = require('./di');
var diContainer = new DIContainer();
diContainer.register('storage', storage);
diContainer.register('messageBus', messageBus);

require('./routes_loader')(app, diContainer);

if(!module.parent) {
  messageBus.start(httpServer);
  var port = process.env.PORT || 3000;
  httpServer.listen(port, function() {
    console.log("Listening at " + port);
  });
}
