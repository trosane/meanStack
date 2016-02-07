angular.module('appRoutes', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        //home page
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        
        // user page that will use the UserController
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'UserController' 
        })
        
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'UserController'
        })
        
        .state('success', {
           url: '/success',
           templateUrl : 'views/success.html',
           controller: 'UserController'
        });
        
        
         // $locationProvider.html5Mode(true);
    
});