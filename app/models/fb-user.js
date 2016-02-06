'use strict;'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var fbSchema = mongoose.Schema ({
   id : String,
   token : String,
   email : String,
   name : String
});

module.exports = mongoose.model('User', UserSchema);