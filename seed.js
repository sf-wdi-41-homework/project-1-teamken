var db = require('./models');

var users = [{
  user:'xdong',
  password:'123321',
  },
  {user:'kenneth',
  password:'abccba',
}
];

db.User.remove({}, function(err, user){
  console.log('removed all books');
    users.forEach(function (userdata) {
    var user = new db.User({
      name: userdata.name,
      password: userdata.password
    });
    user.save(function(err, savedUser){
        if (err) {
            return console.log(err);
        }
    });
  });
});
