const spec_helper = require('./spec_helper'),
  expect = spec_helper.expect,
  DIContainer = require('../app/di');

describe("DI", function() {
  beforeEach(function() {
    this.di = new DIContainer();
  });

  it("stores and gets dependencies", function() {
    var objectToInject = {};
    this.di.register('dependency', objectToInject);

    expect(this.di.resolve('dependency')).to.eq(objectToInject);
  });

  it("resolves a list of dependencies", function() {
    var objectA = {};
    var objectB = {};

    this.di.register('objectA', objectA);
    this.di.register('objectB', objectB);

    expect(this.di.resolveList('objectA', 'objectB')).to.deep.eq([ objectA, objectB ]);
  });

  it("injects arguments", function() {
    var depA = {};
    var depB = {};

    this.di.register('objectA', depA);
    this.di.register('objectB', depB);

    function test(objectA, objectB) {
      expect(objectA).to.eq(depA);
      expect(objectB).to.eq(depB);
    };

    this.di.inject(test)();
  });
});
