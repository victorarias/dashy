const
  app = require('express')(),
  http = require('http'),
  profileMiddleware = require('./middleware/profile');

app.use(profileMiddleware);

app.get('/', function(req, res) {
  res.send("Hello world!");
});

module.exports = app;

if(!module.parent) {
  http.createServer(app).listen(process.env.PORT || 3000);
}
