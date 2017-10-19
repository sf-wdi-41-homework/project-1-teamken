var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project1", { useMongoClient: true });

mongoose.Promise = global.Promise;  // use native Promise

module.exports.User = require('./user.js');
