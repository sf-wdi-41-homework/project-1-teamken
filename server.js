var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var methodOverride = require('method-override');
var fetch = require('node-fetch-json');

//require express in our app
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

// Express settings
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

require('./config/passport')(passport);


// Custom middleware to allow global access to currentUser variable
app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
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


var routes = require(__dirname + "/config/routes");
app.use(routes);

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
