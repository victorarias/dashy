const spec_helper = require('../spec_helper'),
  _ = spec_helper._,
  expect = spec_helper.expect,
  sinon = spec_helper.sinon,
  storage = require('../../app/storage'),
  routesFactory = require('../../app/routes/data');

var messageBus = {},
  routes = routesFactory(storage, messageBus);

describe('Data handler', function() {
  function resolve(method, url) {
    var idx = _.findIndex(routes, function(route) {
      return route.method == method && route.url == url;
    });
    return routes[idx].fn;
  }

  describe('GET /data/:key', function() {
    it('returns data associated with the key in the current profile', function() {
      var route = resolve('get', '/data/:key');
      var req = { params: { key: 'key' }, profile: 'profile' };
      var res = { json: sinon.spy() };
      storage.set('profile', 'key', 'data')

      route(req, res);

      expect(res.json.calledWith({ data: 'data' })).to.eq(true);
    });

    it('restricts access to data associated to the profile', function() {
      var route = resolve("get", "/data/:key");
      var req = { params: { key: 'key' }, profile: 'profileX' };
      var res = { json: sinon.spy() };
      storage.set('profileY', 'key', 'data')

      route(req, res);

      expect(res.json.calledWith({ data: undefined })).to.eq(true);
    });
  });
});
