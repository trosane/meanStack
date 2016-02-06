var User = require('./models/user');
var bcrypt = require('bcrypt-nodejs')

    module.exports = function(app, passport) {
        
        // backend routes =================
        
        app.get('/api/users', function(req, res) {
            // uses mongoose to get all users from the database
            User.find(function(err, users) {
                //if there is an error retrieving, send an error
                if (err)
                    res.send(err);
                
                res.json(users); // return all users in JSON format
            });
        });
        
        // route to handle registering a new user
        
        app.post('/newUser', function(req, res, next) {
            
            var password = req.body.password;
            
            var newUser = new User({
                email: req.body.email,
                password: password,
                displayName: req.body.displayName
            });
            
            newUser.password = newUser.generateHash(password);
            
                       
            newUser.save(function(err) {
                if(err) {
                    res.send(err);
                } else {
                    res.redirect('/');
             }
            
            });
        });
        
        app.get('/allUsers', function(req, res) {
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
        
        
        app.get('/user/login', function(req, res, next) {
            
        });
        // route to handle deleting users goes in app.delete
        
        // frontend routes =================
        // route to handle all angular requests (for all other routes not specified above, 
        // send user to frontend application where Angular can handle the routing)
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html');
        });
        
    };
    
    //route middleware to ensure a user is logged in
    function isLoggedIn(req, res, next) {
        return next(); //if logged in, keep going
        
    // if they are not, redirect them to the home page
    res.redirect('/');
    }