var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// loads the User model
var User = require('../app/models/user');
// loads the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
    
    // requires for persistent login sessions
    passport.serializeUser(function(user, done) {
       done(null, user.id); 
    });
    
    passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       });
    });
    
    // =========================
    // REGISTER PASSPORT
    // =========================
    
    passport.use('local-register', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        //asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' : email }, function(err, user) {
                if (err)
                    return done(err);
                    
                if (user) {
                    return done(null, false);
                } else {
                    var newUser = new User();
                    
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.name = req.body.name;
                    
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
    // =========================
    // LOGIN PASSPORT
    // =========================
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) { //callback with email and pass from out form
        User.findOne({ 'local.email' : email }, function(err, user) {
            if(err)
                return done(err);
                
            if(!user)
                return done(null, false);
                
            if(!user.validPassword(password))
                return done(null, false);
                
            return done(null, user);
        });
    }));
    
    // =========================
    // FACEBOOK PASSPORT
    // =========================
    
    passport.use(new FacebookStrategy({
        clientID : configAuth.facebookAuth.clientID,
        clientSecret : configAuth.facebookAuth.clientSecret,
        callbackURL : configAuth.facebookAuth.callbackURL,
        profileFields : ['id', 'name', 'hometown', 'email']        
    },
    
    // facebook will send back a token and profile
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id}, function(err, user) {
                if(err)
                    return done(err);
                // log in a user if they are found
                if(user) {
                    return done(null, user); //return the found user
                } else {
                    var newUser = new User();
                    
                    newUser.facebook.id = profile.id; // set users facebook id
                    newUser.facebook.token = token; // save the facebook token given to user
                    // save name information
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    // take the first email value of facebook user
                    newUser.facebook.email = profile.emails[0].value || null;
                    
                    newUser.save(function(err) {
                        if(err)
                            throw err;
                            
                        return done(null, newUser);
                    });
                }
            });
        });
    }));   
};