var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project1", {useMongoClient: true});

module.exports.User = require('./user.js');
