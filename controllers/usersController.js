var passport = require("passport")

// GET /signup
function getSignup(req, res) {
  res.render('signup', { message: req.flash('errorMessage') })
}

// POST /signup
function postSignup(req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  });

  return signupStrategy(req, res);
}

// GET /login
function getLogin(req, res) { 
  res.render('login', { message: req.flash('errorMessage') })
}

// POST /login 
function postLogin(req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}

// Restricted page
function getSecret(req, res){
  res.render("secret");
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getSecret: getSecret
}