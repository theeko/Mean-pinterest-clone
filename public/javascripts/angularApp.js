"use stric";
var app = angular.module('myApp', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'MainCtrl',
                resolve: {
                    currentUser: ['auth', function (auth) {
                        return auth.getUser();
                    }]
                }
            })
            
            .state('profile', {
                url: '/profile',
                templateUrl: '/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    userimgs: ['imgFac',"auth", function(imgFac,auth) {
                        return imgFac.getImages(auth.getUser());
                    }],
                }
            });
        
        $urlRouterProvider.otherwise('home');
}]);


