var db = require('../models');
var {
  forwardAuthenticated,
  ensureAuthenticated,
} = require('../auth/authenticate');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', forwardAuthenticated, function(req, res) {
    res.render('login');
  });

  app.get('/register', forwardAuthenticated, function(req, res) {
    res.render('register');
  });

  app.get('/confirmation', ensureAuthenticated, function(req, res) {
    res.render('confirmation');
  });

  app.get('/about', forwardAuthenticated, function(req, res) {
    res.render('about');
  });

  app.get('/contact', forwardAuthenticated, function(req, res) {
    res.render('contact');
  });

  // // Render 404 page for any unmatched routes
  app.get('*', function(req, res) {
    res.render('404');
  });
};
