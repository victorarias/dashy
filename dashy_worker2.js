"use strict";

const
  request = require('superagent'),
  DATA_KEY = "_wow_another_worker_";

setInterval(function() {
  request
    .post('http://localhost:3000/data')
    .send({ key: DATA_KEY, data: new Date() })
    .end(function(err, res) {
    });
}, 100);
