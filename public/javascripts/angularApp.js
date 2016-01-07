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
            .state("newimage", {
              url: "/newimage",
              templateUrl: "newimage.html",
              controller: "newimageCtrl"
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '/profile.html',
                controller: 'ProfileCtrl',
                onEnter: ["imgfac", "auth", function(imgfac, auth){
                    imgfac.getImages("Kairath");
                }],
                resolve: {
                    currentUser: ['auth', function (auth) {
                        return auth.getUser();
                    }]
                }
              });
        
        $urlRouterProvider.otherwise('home');
}]);

angular.module("myApp").factory('auth', ['$http', function($http) {
    var o = {
        user: []
    };
    
    o.getUser = function() {
        return $http.get('/getuser').success(function(data) {
            console.log(data);
          o.user.push(data.displayName);
        });
    };
    
    o.logout = function () {
        return $http.get('/logout').success(function() {
            window.location.href = ""
        });
    }
    
    return o;
}]);


