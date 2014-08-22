const fs = require('fs');

module.exports = function(app, diContainer) {
  fs.readdirSync(__dirname + '/routes/').forEach(function(file) {
    var routesFactory = require('./routes/' + file);
    var routes = diContainer.inject(routesFactory)();

    routes.forEach(function(route) {
      var middlewares = route['middlewares'] || [];
      middlewares.push(route.fn);
      app[route.method](route.url, middlewares);
    });
  });
}
