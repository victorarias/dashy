const assert = require('assert');

describe("DI", function() {
  beforeEach(function() {
    var DIContainer = require("../app/di");
    this.di = new DIContainer();
  });

  it("stores and gets dependencies", function() {
    var objectToInject = {};
    this.di.register('dependency', objectToInject);
    assert.equal(this.di.resolve('dependency'), objectToInject);
  });

  it("resolves a list of dependencies", function() {
    var objectA = {};
    var objectB = {};

    this.di.register('objectA', objectA);
    this.di.register('objectB', objectB);

    assert.deepEqual(this.di.resolveList('objectA', 'objectB'), [ objectA, objectB ]);
  });

  it("injects arguments", function() {
    var depA = {};
    var depB = {};

    this.di.register('objectA', depA);
    this.di.register('objectB', depB);

    function test(objectA, objectB) {
      assert.equal(objectA, depA);
      assert.equal(objectB, depB);
    };

    this.di.inject(test)();
  });
});
