const profileMiddleware = require('../middlewares/profile');

module.exports = function() {
  return [
    {
      method: 'get',
      url: '/',
      middlewares: [ profileMiddleware ],
      fn: function(req, res) {
        res.render('index', { token: req.query.token }).end();
      }
    }
  ];
}
