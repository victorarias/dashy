"use strict";

const
  zmq = require('zmq'),
  publisher = zmq.socket('pub'),
  DATA_KEY = "_worker_data_key_";

var counter = 0;
setInterval(function() {
  console.log("Pushing payload: " + ++counter);
  publisher.send(JSON.stringify({ key: DATA_KEY, data: counter }));
}, 1000);

publisher.connect('tcp://localhost:5432');
