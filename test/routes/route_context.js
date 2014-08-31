const spec_helper = require('../spec_helper'),
  _ = spec_helper._,
  sinon = spec_helper.sinon,
  storage = require('../../app/storage'),
  routesFactory = require('../../app/routes/data'),
  messageBus = { emit: sinon.spy() },
  routes = routesFactory(storage, messageBus);

module.exports = function() {
  beforeEach(function() {
    this.storage = storage;
    this.messageBus = messageBus;
    this.resolveRoute = resolveRoute;
  });

  function resolveRoute(method, url) {
    var idx = _.findIndex(routes, function(route) {
      return route.method == method && route.url == url;
    });
    return routes[idx].fn;
  }
}
