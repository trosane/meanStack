angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {
   $scope.tagline = 'You\'re almost there!'; 
   $scope.email = '';
   
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
       $http.get('/oneUser')
    .success(function(data) {
        $scope.success = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
   }
   
   $scope.grabData = function () {
       $scope.email = this.formEmail;
   }
   
   $http.get('/getData')
    .then(function(results) {
        $scope.user = results.data;
        console.log(results.data);
    })
    

});