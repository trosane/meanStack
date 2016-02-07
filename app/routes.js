var User = require('./models/user');
var bcrypt = require('bcrypt-nodejs')

    module.exports = function(app, passport) {
        
        // backend routes =================
        
        // LOCAL AUTHENTICATION FOR REGISTERING A NEW USER
        app.post('/newUser', passport.authenticate('local-register', {
            successRedirect : '/success',
            failureRedirect : '/register',
        }));
        
        // LOCAL AUTHENTICATION FOR LOGGING IN
        app.post('/user/login', passport.authenticate('local-login', {
            successRedirect : '/success',
            failureRedirect : '/login',
        }));
        
        // FACEBOOK AUTHENTICATION FOR LOGGING IN
        
        // route for facebook authentication and login
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));
        // deals with the callback after facebook has finished authenticating the user
        app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect : '/success',
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
        
        // returns all users in the database
        app.get('/allUsers', function(req, res) {
            User.find(function(err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
        });
        
        app.get('/oneUser' ,function(req, res) {
            User.findOne({ 'local.email' : 'yolo@yolo.com' }, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            })
        })
        
        // app.get('/success', isLoggedIn, function(req, res) {
        //     res.render('success.html')
        // })
        
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