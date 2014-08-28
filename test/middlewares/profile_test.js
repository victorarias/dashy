const spec_helper = require('../spec_helper'),
  Profile = require('../../app/profile'),
  sinon = spec_helper.sinon,
  expect = spec_helper.expect;

describe('Profile middleware', function() {
  it('it assigns a profile to the request', function() {
    var middleware = subject();
    var req = { query: { token: getValidTokenFor(middleware) }};

    middleware(req, {}, function() {});

    expect(req.profile).to.eq("developer");
  });

  it('sends an 403 forbidden response if the token is not valid', function() {
    var middleware = subject();

    var req = { query: { token: 'wow such invalid token' } };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'status');

    middleware(req, res, function() {});

    expect(spy.calledWith(403)).to.eq(true);
  });

  it('sends an 403 forbidden response if there is no token', function() {
    var middleware = subject();

    var req = { query: {} };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'status');

    middleware(req, res, function() {});

    expect(spy.calledWith(403)).to.eq(true);
  });

  it('sends "Invalid token" as the body when there is no token', function() {
    var middleware = subject();

    var req = { query: {} };
    var res = getResponseDouble();
    var spy = sinon.spy(res, 'send');

    middleware(req, res, function() {});

    expect(spy.calledWith('Invalid token.')).to.eq(true);
  });

  function subject() {
    return require('../../app/middlewares/profile');
  }

  function getValidTokenFor(middleware) {
    return Object.keys(Profile.TOKENS)[0];
  }

  function getResponseDouble() {
    return { status: function() { return this; },
      send: function() { return this; },
      end: function() {}
    };
  }
});
