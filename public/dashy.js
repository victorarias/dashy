window.socket = io();
var emitter = new Emitter();

new Widget("_wow_another_worker_").start();
new Widget("_worker_data_key_").start();

socket.on('connect', function(socket) {
  $("#connection-status").text("Connected");
});

socket.on('message', function(message) {
  emitter.emit(message.key, message.data);
});

function Emitter() {
  var events = {};

  return {
    on: function(eventName, callback) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(callback);
    },
    emit: function(eventName, data) {
      listeners = (events[eventName] || []);

      listeners.forEach(function(listener) {
        listener.call(undefined, data);
      });
    }
  };
}

function Widget(key) {
  function listenToNewEvents() {
    emitter.on(key, function(data) {
      handleNewValue(data);
    });
  }

  function handleNewValue(value) {
    var element = $("#" + key);

    if(element.length == 0) {
      element = $("<div class='widget'>").appendTo($("body"));
      element.attr("id", key);
    }

    element.text(value);
  }

  function fetchCurrentValue(callback) {
    $.get('/data/' + key, function(result) {
      callback(result.data);
    });
  }

  return {
    start: function() {
      fetchCurrentValue(function(value) {
        handleNewValue(value);
        listenToNewEvents();
      });
    }
  };
}
