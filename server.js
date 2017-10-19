var db = require('./models');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var fetch = require('node-fetch-json');

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');
var app            = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

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


// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

require('./config/passport')(passport);

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


app.post('api/login',function(req,res) {
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user._id);
  }
});


app.get('/sportsapi', function(req, response){
  apiEndpoint = "http://api.sportradar.us/nba/trial/v4/en/seasons/2016/REG/leaders.json?api_key=qycdwjh8vnrxckj26z5yc7pn";
  fetch(apiEndpoint)
    .then(function(res){
      var points = res.categories[1];
      var players = points.ranks.map( function(rank){
        return rank;

      })
      console.log(players); 
      return response.json(players);
    });
  });


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
