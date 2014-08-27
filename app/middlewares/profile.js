const profile = require('../profile')

var middleware = function(req, res, next) {
  var token = req.query.token;
  var requestProfile = profile.get(token);

  if(requestProfile) {
    req.profile = requestProfile;
  } else {
    res.status(403).
      send('Invalid token.').
      end();
  }

  next();
};

middleware.TOKENS = profile.TOKENS;
module.exports = middleware;
