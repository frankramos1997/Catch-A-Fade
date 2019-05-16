var db = require('../models');
var {
  forwardAuthenticated,
  ensureAuthenticated,
} = require('../auth/authenticate');

module.exports = function(app) {
  // Load index page
  app.get('/', function(req, res) {
    res.render('index');
  });

  // app.get('/profile', ensureAuthenticated, function(req, res) {
  //   res.render('profile', { user: req.user });
  // });

  app.get('/login', forwardAuthenticated, function(req, res) {
    res.render('login');
  });

  app.get('/register', forwardAuthenticated, function(req, res) {
    res.render('register');
  });

  // // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });

  // app.get('*', function(req, res, next) {
  //   res.locals.user = req.user || null;
  //   res.render('404');
  // });
};
