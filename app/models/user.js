'use strict;'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema ({
    local : {
        email : String,
        password : String,
        displayName : String
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    }

});

// hash the password with bcrypt
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);  
};

// check to see if a given password matched the hashed password
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);  
};

module.exports = mongoose.model('User', UserSchema);