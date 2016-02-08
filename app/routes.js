var User = require('./models/user');
var bcrypt = require('bcrypt-nodejs')

    module.exports = function(app, passport) {
        
        // backend routes =================
        
        // LOCAL AUTHENTICATION FOR REGISTERING A NEW USER
        app.post('/newUser', passport.authenticate('local-register', {
            successRedirect : '/success#/homepage',
            failureRedirect : '/register',
        }));
        
        // LOCAL AUTHENTICATION FOR LOGGING IN
        app.post('/user/login', passport.authenticate('local-login', {
            successRedirect : '/success#/homepage',
            failureRedirect : '/login',
        }));
        
        // FACEBOOK AUTHENTICATION FOR LOGGING IN
        
        // route for facebook authentication and login
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));
        // deals with the callback after facebook has finished authenticating the user
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect : '/success#/homepage',
            failureRedirect : '/login'
        }));
        
        // app.get('/login', function(req, res) {
        //     res.sendfile('./public/views/login.html');
        // });
        
        // app.get('/register', function(req, res) {
        //      res.sendfile('./public/views/register.html');
        //  })
        
        // route for logging out
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
        //===================================
        // USER ROUTES
        //===================================
        
            // returns all users in the database
            app.get('/allUsers', function(req, res) {
                User.find(function(err, users) {
                    if (err)
                        res.send(err);
                    res.json(users);
                });
            });
            
            // returns a user by their id
            app.get('/oneUser/:user_id' , function(req, res) {
                console.log(req.user);
                User.findById(req.params.user_id, function(err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            });
            
            // updates a user's display name with this id
            app.put('/oneUser/name/:user_id', function(req, res) {
                User.findById(req.params.user_id, function(err, user) {
                    if (err)
                        res.send(err);
                        
                    user.local.name = req.body.name;
                    
                    user.save(function(err) {
                        if (err)
                            res.send(err);
                            
                        res.json({ message: 'User updated'});
                    });
                });
            });
            
            // updates a user's password with this id
            app.put('/oneUser/password/:user_id', function(req, res) {
               User.findById(req.params.user_id, function(err, user) {
                   if (err)
                       res.send(err);
                    
                    var oldPassword = req.body.oldPass;
                    
                    if (!user.validPassword(oldPassword)) {
                        console.log('that isn\'t you current password!');
                        res.send ('no');
                    } else {
                        console.log('way to put in your current password!');
                        var newPassword = req.body.newPass;
                        var encryptedPass = user.generateHash(newPassword);
                    
                        user.local.password = encryptedPass;
                        
                        user.save(function(err) {
                            if (err)
                                res.send(err);
                                
                            res.json({ message: 'User updated'});
                        });
                    }
                });
            });
        
        
        
        app.get('/getData', function(req, res) {
            res.json(req.user); 
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