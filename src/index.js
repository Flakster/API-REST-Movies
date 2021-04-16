const express = require('express');
const path = require('path');
const exphbs = requiere('express-handlebars');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares

// Global Variables

// Routes

// Statis Files

// Server listening

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'));
});