angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $http, $state, $stateParams, $cookies) {
   
    $scope.user = $cookies.getObject('user');
    $scope.user_id = $cookies.get('id');
    // $scope.watch('gravEmail', function() {
    //     $scope.message = 'Your email Hash is: ' + md5.createHash($scope.gravEmail || '');
    // })
    
   // ERROR FLAGS FOR PROFILE CHANGES
   $scope.notCurrentPassword = false; //determines is password is the current password
   $scope.passwordsDontMatch = false; //determines if the passwords match or not
   $scope.success = false;
    
   $scope.infoName = {name: ''};
   $scope.infoPass = {oldPass: '', newPass: '', newPassConf: ''};
    
    $scope.changeName = function() {
        $http.put('/oneUser/name/' + $scope.user_id, $scope.infoName)
        .then(function(results) {
            if (results.message == 'success');
            $cookies.remove('user');
            $cookies.putObject('user', results.data.user);
            $scope.user = results.data.user;
        });
    };
    
    $scope.changePass = function() {
        if ($scope.infoPass.newPass != $scope.infoPass.newPassConf) {
            $scope.passwordsDontMatch = true;
            $scope.notCurrentPassword = false;
        } else {
            $scope.passwordsDontMatch = false;
            $http.put('/oneUser/password/' + $scope.user_id, $scope.infoPass)
            .then(function(results) {
                // if the current password doesn't match the password inputted by the user
                if(results.data == 'password match failure') {
                    $scope.notCurrentPassword = true;
                } else {
                    $scope.notCurrentPassword = false;
                    $scope.success = true;
                }
            });
        };
    };
    
    $scope.logout = function() {
        $cookies.remove('user');
        $cookies.remove('id');
        $http.get('/logout')
            .then(function(results) {
                $state.go('home', {});
            });
    };
});