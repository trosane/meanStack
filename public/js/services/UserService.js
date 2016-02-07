angular.module('UserService', [])

    .factory('Users', function($http) {
        return {
            get : function() {
                return $http.get('/allUsers');
            }
        }
    });