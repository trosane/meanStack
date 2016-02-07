angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {
   $scope.tagline = 'You\'re almost there!'; 
   
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

});