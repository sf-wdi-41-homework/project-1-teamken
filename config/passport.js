var LocalStrategy = require( "passport-local" ).Strategy;
var db = require( "../models" );
var express = require('express');
var app            = express();

module.exports = function ( passport ) {

  passport.serializeUser( function ( user, done ) {
    done( null, user._id );
  } );

  passport.deserializeUser( function ( id, done ) {
    db.User.findById( id, function ( err, user ) {
      // If a user is found it will be assigned to req.user
      done( err, user );
    } )
  } );

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // 'local-signup' is the name of the strategy. To use it for authentication, pass
  // the name as the first argument: passport.authenticate('local-signup')
  app.post('/signup', function (req,res) {
    passport.use('local-signup', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
      },
      function(req, email, password, done) {

  		//look for user email in our database
          User.findOne({ 'local.email' :  email }, function(err, user) {
              if (err)
                  return done(err);
              if (user) {
                  return done(null, false, req.flash('signupMessage', 'That email used'));
              } else {
                  // create new user if not in the database
                  var newUser            = new User();
                  // I cant get encrypt from lecture to work therefore I looked online and found new way of getting hash
                  newUser.local.email    = email;
                  newUser.local.password = password; // use the generateHash function

  				// save user
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }
          });
    // res.redirect('views/index.html', {root: __dirname})
  }))
})


  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/',
  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // 'local-login' is the name of the strategy. To use it for authentication, pass
  // the name as the first argument: passport.authenticate('local-login')
  passport.use( 'local-login', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
  },
  function ( req, email, password, done ) {
    if (email) {
      // Use lower-case e-mails to avoid case-sensitive e-mail matching
      email = email.toLowerCase();
    }
    // Search for a use with this email
    db.User.findOne({ 'local.email': email }, function ( err, user ) {
      console.log("Finding user: ", user);
      if ( err ) {
        return done( err );
      }

      // If no user is found
      if ( !user ) {
        return done( null, false, req.flash( 'loginMessage', 'No user found.' ) );
      }

      // Check if the password is correct
      if ( !user.local.password == password ) {
        return done(null, false, req.flash('loginMessage', 'Oops wrong password!'));
      }

      else {
        return done(null, user);
      }
    } );

  } ) );
};
