'use strict;'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    
   local : {
        email : {type : String, required: true} ,
        password : {type: String, required: true},
        displayName : {type: String}
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
UserSchema.methods.validPassowrd = function(password) {
    return bcrypt.compareSync(password, this.password);  
};

module.exports = mongoose.model('User', UserSchema);