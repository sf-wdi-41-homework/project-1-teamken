var mongoose = require('mongoose');
//  TODO: also connec to process.MONGODB_URI to be able to deploy to heroku
mongoose.connect('mongodb://localhost/project1', { useMongoClient: true });

mongoose.Promise = global.Promise; // use native Promise

module.exports.User = require('./user.js');
