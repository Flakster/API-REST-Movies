"use strict";

var express = require('express');

var path = require('path');

var exphbs = require('express-handlebars');

var hbs = require('handlebars');

var methodOverride = require('method-override');

var session = require('express-session');

var flash = require('connect-flash'); // Initializations


var app = express();

require('./database'); // Settings


app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
  partialsDir: path.resolve(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
hbs.registerHelper("isSelected", function (arg1, arg2) {
  return arg1 === arg2 ? 'selected' : '';
}); // Middlewares

app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // Global Variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
}); // Routes

app.use(require('./routes/index'));
app.use(require('./routes/movies.js'));
app.use(require('./routes/classifications')); // Static Files

app.use(express["static"](path.join(__dirname, 'public'))); // Server listening

app.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});