const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
  partialsDir: path.resolve(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
hbs.registerHelper("isSelected", (arg1, arg2)=>{
  return arg1 === arg2 ? 'selected' : '';
});

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: ('secret'),
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');

  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/movies.js'));
app.use(require('./routes/classifications'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server listening
app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'));
});