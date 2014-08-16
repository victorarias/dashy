const assert = require('assert'),
  sinon = require('sinon')


describe('Profile middleware', function() {
  function subject() {
    return require('../../app/middleware/profile');
  }
  function getValidTokenFor(middleware) {
    return Object.keys(middleware.TOKENS)[0];
  }

  it('it assigns a profile to the request', function() {
    var middleware = subject();
    var req = { query: { token: getValidTokenFor(middleware) }};

    middleware(req, {}, function() {});

    assert.equal("developer", req.profile);
  });

  it('sends an 403 forbidden response if the token is not valid', function() {
    var spy = sinon.spy();
    var middleware = subject();

    var req = { query: { token: 'wow such invalid token' } };
    var res = { send: spy };

    middleware(req, res, function() {});

    assert(spy.calledWith(403, sinon.match.object));
  });

  it('sends an 403 forbidden response if there is no token', function() {
    var spy = sinon.spy();
    var middleware = subject();

    var req = { query: {} };
    var res = { send: spy };

    middleware(req, res, function() {});

    assert(spy.calledWith(403, sinon.match.object));
  });
});
