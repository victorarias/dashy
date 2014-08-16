const assert = require('assert'),
  sinon = require('sinon')


describe('Profile middleware', function() {
  it('it assigns a profile to the request', function() {
    var middleware = subject();
    var req = { query: { token: getValidTokenFor(middleware) }};

    middleware(req, {}, function() {});

    assert.equal("developer", req.profile);
  });

  it('sends an 403 forbidden response if the token is not valid', function() {
    var middleware = subject();

    var req = { query: { token: 'wow such invalid token' } };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'status');

    middleware(req, res, function() {});

    assert(spy.calledWith(403));
  });

  it('sends an 403 forbidden response if there is no token', function() {
    var middleware = subject();

    var req = { query: {} };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'status');

    middleware(req, res, function() {});

    assert(spy.calledWith(403));
  });

  it('sends "Invalid token" as the body when there is no token', function() {
    var middleware = subject();

    var req = { query: {} };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'body');

    middleware(req, res, function() {});

    assert(spy.calledWith('Invalid token.'));
  });

  function subject() {
    return require('../../app/middleware/profile');
  }

  function getValidTokenFor(middleware) {
    return Object.keys(middleware.TOKENS)[0];
  }

  function getResponseDouble() {
    return { status: function() { return this; },
      body: function() { return this; },
      end: function() {}
    };
  }
});
