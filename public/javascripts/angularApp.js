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
              controller: "newimageCtrl",
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
                    uimages: ["imgfac","auth", function(imgfac,auth){
                        return imgfac.getImages(localStorage.getItem("user"));
                    }]
                }
                // onEnter: ['imgfac', 'auth', function(imgfac, auth) {
                //         return imgfac.getImages("Kairath");
                //     }]
              })
              .state('allimages', {
                url: '/allimages',
                templateUrl: '/allimages.html',
                controller: 'allimagesCtrl',
                resolve: {
                    allimages: ["imgfac","auth", function(imgfac,auth){
                        return imgfac.getAllImages();
                    }],
                    currentUser: ['auth', function (auth) {
                        return auth.getUser();
                    }]
                }
                // onEnter: ['imgfac', 'auth', function(imgfac, auth) {
                //         return imgfac.getAllImages(localStorage.getItem("user"));
                //     }]
              });
        
        $urlRouterProvider.otherwise('home');
}]);

    
