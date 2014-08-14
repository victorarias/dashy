"use strict";

const
  app = require('express')(),
  bodyParser = require('body-parser'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  storage = {};

app.use(bodyParser());

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.post('/data', function(req, res) {
  let message = req.body;
  storage[message.key] = message.data;
  io.emit('message', message);
});

app.get('/data/:key', function(req, res) {
  res.json({ data: storage[req.params.key] });
});

http.listen(3000);
