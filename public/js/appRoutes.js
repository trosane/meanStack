angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $routeProvider
        //home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        
        // user page that will use the UserController
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'UserController' 
        })
        
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UserController'
        });
        
        
        $locationProvider.html5Mode(true);
    
}]);