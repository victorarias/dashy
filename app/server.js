const
  express = require('express')
  app = express(),
  messageBus = require('./message_bus')(require('socket.io')),
  path = require('path'),
  bodyParserMiddleware = require('body-parser'),
  storage = require('./storage');

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
  var httpServer = require('http').Server(app);
  var port = process.env.PORT || 3000;
  httpServer.listen(port, function() {
    console.log('Listening at ' + port);
    messageBus.start(httpServer);
  });
}
