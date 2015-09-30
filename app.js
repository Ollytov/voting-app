var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var expressSession = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var config = require("./config");
var passportConfig = require("./auth/passport-config");
var connectMongo = require("connect-mongo");

var MongoStore = connectMongo(expressSession);

var routes = require('./routes/index');
var users = require('./routes/users');
var polls = require('./routes/polls');

var app = express();

mongoose.connect(config.mongoUri);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

passportConfig();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/pollview', polls);














/////////////////
// ERROR HANDLERS
/////////////////

// Catch 404 and Return to Error Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development Error Handlers
// Will Print Stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production Error Handler
// No Stacktraces Leaked to the User
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
