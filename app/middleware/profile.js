const TOKENS = {
  "123": "developer"
};

var middleware = function(req, res, next) {
  var token = req.query.token;
  if(token && TOKENS[token]) {
    req.profile = TOKENS[token];
  } else {
    res.status(403).
      body('Invalid token.').
      end();
  }

  next();
};

middleware.TOKENS = TOKENS;
module.exports = middleware;
