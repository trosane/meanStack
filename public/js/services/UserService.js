angular.module('UserService', []).factory('User', ['$http', function($http) {
    
    return {
        // call to get all users
        get : function() {
            return $http.get('/api/users');
        },
        
        //these will work later when more API routes are defined on the Node side
        // call to POST and create a new user
        create : function(userData) {
            return $http.post('/api/users', userData);
        },
        
        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
        
    }
}]);