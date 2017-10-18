var db = require('./models')
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var methodOverride = require('method-override');

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');
var app            = express();

  // Setup database
  var databaseURL = 'mongodb://localhost/local-authentication-with-passport'
  mongoose.connect(databaseURL);

  // Setup middleware
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(ejsLayouts);
  app.use(express.static(__dirname + '/public'));
  // use express.session() before passport.session() to ensure that the login session is restored in the correct order
  app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
  // passport.initialize() middleware is required to initialize Passport.
  app.use(passport.initialize());
  // If your application uses persistent login sessions, passport.session()
  app.use(passport.session());
  app.use(flash());
  app.use(methodOverride(function(request, response) {
    if(request.body && typeof request.body === 'object' && '_method' in request.body) {
      var method = request.body._method;
      delete request.body._method;
      return method;
    }
  }));

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
