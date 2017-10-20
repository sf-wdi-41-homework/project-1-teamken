var passport = require("passport")

// GET /signup
function getSignup(req, res) {
  res.render('/', { message: req.flash('errorMessage') })
}

// POST /signup
function postSignup(req, res) {
  console.log("IN POST SIGNUP");
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  });

  return signupStrategy(req, res);
}

// GET /login
function getLogin(req, res) {
  res.render('/', { message: req.flash('errorMessage') })
}

// POST /login
function postLogin(req, res) {
  console.log("IN ROUTER FOR LOGIN");
  console.log(req.params);
  console.log(req.route.stack);

  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/ManagementPage.ejs",
    failureRedirect: "/",
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
