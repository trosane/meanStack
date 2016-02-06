'use strict';
// add express
var express = require('express');
var app = express();
// add miscellaneous packages
var bodyParser = require('body-parser');
var methodOverride  = require('method-override');
var morgan = require ('morgan');

//PASSPORT STUFF

var passport = require('passport');
var session = require('express-session');
var cookieSignatureSecret = '2d4d150d-e5a7-4425-9d95-1bd6bd8bd5e1';

var mongoose = require('mongoose');

var db  = require('./config/mongo-db');

mongoose.connect(db.url);

require('./config/passport')(passport);

// get all data from the POST body parameters
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(methodOverride('X-HTTP-Method-Override'));

//PASSPORT REQUIREMENTS
app.use(session({ 
    secret: cookieSignatureSecret,
    resave: false,
    saveUninitialized: false,
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app, passport); // configure routes

app.listen(80, function() {
    console.log('server is running on port 80...');
})