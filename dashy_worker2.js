"use strict";

const
  zmq = require('zmq'),
  publisher = zmq.socket('pub'),
  DATA_KEY = "_wow_another_worker_";

setInterval(function() {
  publisher.send(JSON.stringify({ key: DATA_KEY, data: new Date() }));
}, 1000);

publisher.connect('tcp://localhost:5432');
