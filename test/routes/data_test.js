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
      var res = this.createResponse();

      this.storage.set('profile', 'key', 'data')

      route(req, res);

      expect(res.jsonData).to.deep.eq({ data: 'data' });
      expect(res.end.called).to.eq(true);
    });

    it('restricts access to data associated to the profile', function() {
      var route = this.resolveRoute("get", "/data/:key");
      var req = { params: { key: 'key' }, profile: 'profileX' };
      var res = this.createResponse();

      this.storage.set('profileY', 'key', 'data')

      route(req, res);

      expect(res.jsonData).to.deep.eq({ data: undefined });
      expect(res.end.called).to.eq(true);
    });
  });

  describe('POST /data', function() {
    beforeEach(function() {
      var route = this.resolveRoute('post', '/data');
      var payload = { key: 'key', data: 'data' }
      var req = { body: payload, profile: 'profile' };
      var res = this.createResponse();

      route(req, res);

      this.payload = payload;
      this.res = res;
    });

    it('stores posted payload', function() {
      expect(this.storage.get('profile', 'key')).to.eq('data');
      expect(this.res.end.called).to.eq(true);
    });

    it('emits the payload', function() {
      var payload = this.payload;
      expect(this.messageBus.emit.calledWith('message', payload)).to.eq(true);
      expect(this.res.end.called).to.eq(true);
    });
  });
});
