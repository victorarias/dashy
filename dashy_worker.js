"use strict";

const
  request = require('superagent'),
  DATA_KEY = "_worker_data_key_";

var counter = 0;
setInterval(function() {
  counter += 1;
  console.log("Pushing payload: " + counter);
  request
    .post('http://localhost:3000/data')
    .send({ key: DATA_KEY, data: counter, profile: "developer" })
    .end(function(err, res) {
    });
}, 1000);
