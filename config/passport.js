var LocalStrategy = require( "passport-local" ).Strategy;
var db = require( "../models" );

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
  passport.use( 'local-signup', new LocalStrategy( {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  function ( req, email, password, done ) {
    if (email)
      email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // Find a user with this email
    db.User.findOne( { 'local.email': email }, function ( err, user ) {
      if ( err ) {
        return done( err );
      }

      // If there is a user with this email
      if ( user ) {
        return done( null, false, req.flash( 'signupMessage', 'This email is already used!' ) );
      } else {

        var newUser = new db.User();
        newUser.local.email = email;
        newUser.local.password = db.User.encrypt( password );

        newUser.save( function ( err ) {
          if ( err ) {
            return done( err );
          }
          return done( null, newUser );
        });
      }
    });
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
