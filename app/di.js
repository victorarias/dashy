function DIContainer() {
  this.store = {};

  this.argList = function(fn) {
    var args = fn.toString().match(/function.*?\(([\s\S]*?)\)/);
    return args[1].split(',').map(function(arg) { return arg.trim(); });
  };
}

DIContainer.prototype.register = function(key, dependency) {
  this.store[key] = dependency;
}

DIContainer.prototype.resolve = function(key) {
  return this.store[key];
}

DIContainer.prototype.resolveList = function() {
  var that = this;
  return Array.prototype.slice.call(arguments).map(function(dependencyName) {
    return that.resolve(dependencyName);
  });
}

DIContainer.prototype.inject = function(fn) {
  var that = this;
  var argList = this.argList(fn);

  var injector = function() {
    return fn.apply(null, that.resolveList.apply(that, argList));
  };

  return injector;
}

module.exports = DIContainer;
