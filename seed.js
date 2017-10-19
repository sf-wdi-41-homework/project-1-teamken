var db = require('./models');

var users = [
    {
      email:'xdong@example.com',
      password:'123321'
    },
    {
      email:'kenneth@example.com',
      password:'abccba'
    }
];

db.User.remove({}, function(err, u){
  console.log('removed all books');
  users.forEach(function (userdata) {
    var user = new db.User({
      email: userdata.email,
      password: userdata.password
    });
    user.save(function(err, savedUser){
      if (err) {
          return console.log(err);
      }
      console.log(savedUser)
    });
  });
    console.log("Users created.")
});
