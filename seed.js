var db = require('./models');

var users = [
    {
        local: {
            email:'xdong@example.com',
            password:'123321'
        }
    },
    {
        local: {
            email:'kenneth@example.com',
            password:'abccba'
        }
    }
];

db.User.remove({}, function(err, u){
  console.log('removed all books');
  users.forEach(function (userdata) {
    var user = new db.User({
        local: {
            email: userdata.local.email,
            password: userdata.local.password
        }
    });
    user.save(function(err, savedUser){
      if (err) {
          return console.log(err);
      }
      console.log(savedUser.local)
    });
  });
    console.log("Users created.")
});
