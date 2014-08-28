const Profile = require('../profile')

var middleware = function(req, res, next) {
  var token = req.query.token;
  var requestProfile = Profile.get(token);

  if(requestProfile) {
    req.profile = requestProfile;
  } else {
    res.status(403).
      send('Invalid token.').
      end();
  }

  next();
};

middleware.TOKENS = Profile.TOKENS;
module.exports = middleware;
