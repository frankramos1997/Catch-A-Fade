var passport = require('passport');

var db = require('../models');

module.exports = function(app) {
  app.post(
    '/api/login',
    passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
    }),
    function(req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    },
  );

  app.post(
    '/api/register',
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
    }),
  );

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
