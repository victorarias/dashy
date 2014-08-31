const spec_helper = require('../spec_helper'),
  expect = spec_helper.expect,
  sinon = spec_helper.sinon,
  routeContext = require('./route_context');

describe('Data handler', function() {
  routeContext();

  describe('GET /data/:key', function() {
    it('returns data associated with the key in the current profile', function() {
      var route = this.resolveRoute('get', '/data/:key');
      var req = { params: { key: 'key' }, profile: 'profile' };
      var res = { json: sinon.spy() };
      this.storage.set('profile', 'key', 'data')

      route(req, res);

      expect(res.json.calledWith({ data: 'data' })).to.eq(true);
    });

    it('restricts access to data associated to the profile', function() {
      var route = this.resolveRoute("get", "/data/:key");
      var req = { params: { key: 'key' }, profile: 'profileX' };
      var res = { json: sinon.spy() };
      this.storage.set('profileY', 'key', 'data')

      route(req, res);

      expect(res.json.calledWith({ data: undefined })).to.eq(true);
    });
  });
});
