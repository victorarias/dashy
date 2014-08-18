window.socket = io.connect('http://localhost:3000', {
  query: 'token=' + window.TOKEN
});

app = angular.module('dashboard', []);

app.service('MessagePump', function($rootScope) {
  var events = {};
  var messagePump = {
    on: function(eventName, callback) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(callback);
    },
    emit: function(eventName, data) {
      listeners = (events[eventName] || []);

      $rootScope.$apply(function() {
        listeners.forEach(function(listener) {
          listener.call(undefined, data);
        });
      })
    },
    initializeAndAttach: function(eventName, callback) {
      var that = this;
      $.get('/data/' + eventName, function(result) {
        callback(result.data);
        that.on(eventName, callback);
      });
    }
  };

  socket.on('message', function(message) {
    messagePump.emit(message.key, message.data);
  });

  return messagePump;
});

app.directive('dsWidget', function() {
  return {
    restrict: 'E',
    scope: {
      sourceKey: '@'
    },
    controller: function($scope, $interval, MessagePump) {
      MessagePump.initializeAndAttach($scope.sourceKey, function(value) {
        $scope.value = value;
      });
    },
    template: '{{value}}'
  };
});

socket.on('connect', function(socket) {
  $('#connection-status').text('Connected');
});

socket.on('disconnect', function() {
  $('#connection-status').text('Not connected');
});
