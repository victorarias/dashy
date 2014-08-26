var areas = {};

//TODO: use redis, memcache or whatever

module.exports = {
  get: function(area, key) {
    var stash = areas[area] || {};

    return stash[key];
  },
  set: function(area, key, value) {
    if(!areas[area]) areas[area] = {};

    var stash = areas[area];
    stash[key] = value;

    return this;
  }
};
