var passport = require('passport');

var db = require('../models');
var {
  forwardAuthenticated,
  ensureAuthenticated,
} = require('../auth/authenticate');

module.exports = function(app) {
  // login process
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

  // register process
  app.post('/api/register', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        var data = {
          user_id: user.id,
        };

        // save user id in customers table
        db.Customer.create(data).then(function(data, created) {
          console.log('data', data);
        });

        return res.redirect('/profile');
      });
    })(req, res, next);
  });

  // logout process
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // fetch profile data process
  app.get('/profile', ensureAuthenticated, function(req, res) {
    db.Customer.findOne({ where: { user_id: req.user.id }, raw: true }).then(
      function(user) {
        res.render('profile', { userData: user });
      },
    );
  });

  // edit profile process
  app.post('/api/profile', function(req, res) {
    db.Customer.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone_number: req.body.phone,
        address: req.body.address,
      },
      { where: { user_id: req.user.id } },
    ).then(function(data) {
      console.log('data', data);
    });
  });
};
