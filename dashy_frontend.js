"use strict";

const
  zmq = require('zmq'),
  subscriber = zmq.socket('sub'),
  app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  storage = {};

subscriber.subscribe('');

subscriber.on("message", function(message) {
  message = JSON.parse(message);
  storage[message.key] = message.data;
  io.emit('message', message); // pipe to websockets
});

subscriber.bind('tcp://*:5432');

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/data/:key', function(req, res) {
  res.json({ data: storage[req.params.key] });
});

http.listen(3000);
