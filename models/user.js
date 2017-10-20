var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema({
    local: {
        email: String,
        password: String
    }
});

// TODO: bycrypt isn't properly decrypting/encrypting passwords. Investigate later.
UserSchema.statics.encrypt = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
