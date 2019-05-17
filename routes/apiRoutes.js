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
        if (user.role == 'barber') {
          db.Barber.create(data).then(function(data, created) {});
        } else {
          db.Customer.create(data).then(function(data, created) {});
        }

        return res.redirect('/profile');
      });
    })(req, res, next);
  });

  // logout process
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  // fetch profile data process
  app.get('/profile', ensureAuthenticated, function(req, res) {
    if (req.user.role == 'barber') {
      db.Barber.findOne({ where: { user_id: req.user.id }, raw: true }).then(
        function(user) {
          res.render('profile', { barberData: user });
        },
      );
    } else {
      db.Customer.findOne({ where: { user_id: req.user.id }, raw: true }).then(
        function(user) {
          res.render('profile', { customerData: user });
        },
      );
    }
  });

  // edit customer profile process
  app.post('/api/customer/profile', function(req, res) {
    db.Customer.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone_number: req.body.phone,
        address: req.body.address,
        isUpdated: 1,
      },
      { where: { user_id: req.user.id } },
    ).then(function(data) {
      console.log('data', data);
    });
  });

  // edit barber profile process
  app.post('/api/barber/profile', function(req, res) {
    db.Barber.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone_number: req.body.phone,
        car_type: req.body.car,
        licence_plate: req.body.license,
        isUpdated: 1,
      },
      { where: { user_id: req.user.id } },
    ).then(function(data) {
      console.log('data', data);
    });
  });

  // get all barbers process
  app.get('/barbers', ensureAuthenticated, function(req, res) {
    db.Barber.findAll({ raw: true }).then(function(barbers) {
      res.render('barbers', { barbers: barbers });
    });
  });
};
