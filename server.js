require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var passport = require('passport');
var session = require('express-session');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

Handlebars.registerHelper('ifvalue', function(conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// // Setup for passport Local
require('./auth/passport')(passport);

// inject user data in all templates
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT,
    );
  });
});

module.exports = app;
