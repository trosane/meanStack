angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {
   $scope.tagline = 'You\'re almost there!'; 
   $scope.infoName = {name: ''};
   $scope.infoPass = {oldPass: '', newPass: ''};
   $scope.error = false;
   $scope.success = false;
   
   $scope.getAll = function() {
       $http.get('/allUsers')
    .success(function(data) {
        $scope.success = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
   }
   
   $scope.getOne = function() {
       $http.get('/oneUser' + $scope.user_id)
    .success(function(data) {
        $scope.success = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
   }
   
   $http.get('/getData')
    .then(function(results) {
        var schemaType = Object.keys(results.data)[2];
        if (schemaType == 'local') {
            $scope.user = results.data.local
        } else {
            $scope.user = results.data.facebook;
        }
        $scope.user_id = results.data._id
        console.log($scope.user);
    })
    
    $scope.changeName = function() {
        $http.put('/oneUser/name/' + $scope.user_id, $scope.infoName)
        .then(function(results) {
            console.log(results);
        });
    };
    
    $scope.changePass = function() {
        $http.put('/oneUser/password/' + $scope.user_id, $scope.infoPass)
        .then(function(results) {
            if(results.data == 'no') {
                $scope.error = true;
            } else {
                $scope.error = false;
                $scope.success = true;
            }
        });
    };

});