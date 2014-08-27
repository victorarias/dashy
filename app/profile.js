const TOKENS = {
  "123": "developer",
  "456": "super"
};

var profile = {
  TOKENS: TOKENS,
  get: function(token) {
    return TOKENS[token];
  }
}

module.exports = profile;
