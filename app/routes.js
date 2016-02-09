var User = require('./models/user');
var bcrypt = require('bcrypt-nodejs')

    module.exports = function(app, passport) {
        
        // backend routes =================
        
        // LOCAL AUTHENTICATION FOR REGISTERING A NEW USER
        app.post('/newUser', function(req, res, next) {
            passport.authenticate('local-register', function(error, user, info) {
                if(error)
                    return res.json({ message : error });
                if(!user)
                    return res.json({ message : 'user already exists' });
                res.json({ message : 'success', user : user});
            }) (req, res, next);
        });
        
        // LOCAL AUTHENTICATION FOR LOGGING IN
        app.post('/user/login', function(req, res, next) {
            passport.authenticate('local-login', function(error, user, info) {
                if(error)
                    return res.json({ message : 'error' });
                if(!user)
                    return res.json({ message : 'no user'});
                res.json({ message : 'success', user : user });
            }) (req, res, next);
        });
        
        // FACEBOOK AUTHENTICATION FOR LOGGING IN
        // route for facebook authentication and login
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));
        // deals with the callback after facebook has finished authenticating the user
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect : '/#/homepage',
            failureRedirect : '/login'
        }));
        
        // route for logging out
        app.get('/logout', function(req, res) {
            req.logout();
            res.json( { message : 'logged out'} );
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
                            
                        res.json({ message: 'success', user : user.local});
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
                        res.send ('password match failure');
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
        
        
        // route to handle deleting users goes in app.delete
        
        // frontend routes =================
        // route to handle all angular requests (for all other routes not specified above, 
        // send user to frontend application where Angular can handle the routing)
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html');
        });
        
        // app.get('/homepage', isLoggedIn, function(req, res, next) {
        //     return next();
        // });
        
        // //route middleware to ensure a user is logged in
        // function isLoggedIn(req, res, next) {
        //     if(req.user) {
        //         next(); //if logged in, keep going
        //     } else {
        //         // if they are not, redirect them to the home page
        // res.redirect('/');
        //     }
        // };
        
    };