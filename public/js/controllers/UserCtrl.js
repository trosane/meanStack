angular.module('UserCtrl', []).controller('UserController', function($scope, $http, $state, $cookies) {
   $scope.tagline = 'You\'re almost there!'; 
   
   // CAPTURES USER INPUT
   $scope.infoLogin = {email: '', password: ''};
   $scope.infoRegister = {email: '', password: '', newPass: '', name: ''};
   
   // ERROR FLAGS FOR LOGIN AND REGISTER (set to true to trigger front side error message)
   $scope.loginFailure = false;
   $scope.registerFailure = {exists: false, passMatch: false}
   
   //LOGIN FUNCTION
   $scope.login = function() {
       $http.post('/user/login', $scope.infoLogin)
        .then(function(results) {
            // if the passport authentication was successful
            if ( results.data.message == 'success' ) {
                var user = results.data.user;
                var schemaType = Object.keys(user)[2];
                // if the user is a local user
                if (schemaType == 'local') {
                    $scope.user = user.local;
                } else { // if the user is a facebook user
                    $scope.user = user.facebook;
                }
                $scope.user_id = user._id;
                // set cookies for user info persistence
                $cookies.putObject('user', $scope.user);
                $cookies.put('id', $scope.user_id);
                $state.go('homepage', {});
            } else {
                $scope.loginFailure = true;
            }
        })
   };
   
   $scope.register = function() {
       $scope.infoRegister.exists = false;
       if ($scope.infoRegister.password != $scope.infoRegister.newPass) {
           $scope.registerFailure.passMatch = true;
       } else {
        $http.post('/newUser', $scope.infoRegister)
            .then(function(results) {
            // if the passport authentication was successful
            if( results.data.message == 'success' ) {
                var user = results.data.user.local;
                var user_id = results.data.user._id;
                // set cookies for user info persistence
                $cookies.putObject('user', user);
                $cookies.put('id', user_id);
                $state.go('homepage', {});
            } else {
                $scope.registerFailure.passMatch = false; // removes the password error message
                $scope.registerFailure.exists = true; // shows the 'user exists' error message
            }
        });
       }
   };
   

   
   //    $scope.getAll = function() {
//        $http.get('/allUsers')
//     .success(function(data) {
//         $scope.success = data;
//     })
//     .error(function(data) {
//         console.log('Error: ' + data);
//     });
//    }
   
//    $scope.getOne = function() {
//        $http.get('/oneUser' + $scope.user_id)
//     .success(function(data) {
//         $scope.success = data;
//     })
//     .error(function(data) {
//         console.log('Error: ' + data);
//     });
//    }

});