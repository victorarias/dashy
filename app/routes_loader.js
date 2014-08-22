const fs = require('fs');

module.exports = function(app, dependencyContainer) {
  fs.readdirSync(__dirname + '/routes/').forEach(function(file) {
    var routes = require('./routes/' + file)(dependencyContainer);

    routes.forEach(function(route) {
      var middlewares = route['middlewares'] || [];
      middlewares.push(route.fn);
      app[route.method](route.url, middlewares);
    });
  });
}
