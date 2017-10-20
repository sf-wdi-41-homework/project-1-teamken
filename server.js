//require express in our app
var express = require('express');
var app            = express();
var bodyParser = require('body-parser');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var fetch = require('node-fetch-json');
var db = require('./models');

// pass passport configuration
var passport = require('passport');

// =====================================================
// CONFIGURATION
// =====================================================
app.set("views", __dirname + "/views");

// Setup middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); // always before passport
app.use(bodyParser.urlencoded({ extended: true }));  // nice formatting of form data

// Configure passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// Optional alternative way to handle login redirect
// app.post('/login', passport.authenticate('local-login', { successRedirect: '/users',
//     failureRedirect: '/' }));

app.post('/login',
    passport.authenticate('local-login'),
  function(req, res) {
    console.log("Authenticating user: ", req.user._id);
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user._id);
  });

app.get('/users/:id', function(req, res) {
    let user = db.User.findById(req.params.id);
    console.log('Fetching user: ', user);
    res.sendFile('views/profile.html', {root: __dirname})
});

app.get('/users', function(req, res) {
    res.send('You are logged in.');
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
