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
        
        .state('homepage', {
           url: '/homepage',
           templateUrl : 'views/homepage.html',
           controller: 'ProfileController',
           params: {'user' : null, 'id' : null}
        })
        
        .state('profile', {
            url:'/profile',
            templateUrl : 'views/profile.html',
            controller : 'ProfileController'
        })
        
        
         // $locationProvider.html5Mode(true);
    
});