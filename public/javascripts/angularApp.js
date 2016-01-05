var app = angular.module('app', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'MainCtrl',
                onEnter: ['images', function(images) {
                        return images.getImages();
                    }],
                resolve: {
                    postPromise: ['auth', function(auth) {
                        return auth.getUser();
                    }]
                }
            })
            
            .state('profile', {
                url: '/profile',
                templateUrl: '/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    postPromise: ['auth', function(auth) {
                        return auth.getInfo();
                    }]
                },
                onEnter: ['images', 'auth', function(images, auth) {
                        return images.searchAuthor(auth.user.username);
                    }]
            })
        
        $urlRouterProvider.otherwise('home');
}]);
        
app.factory('auth', ['$http', function($http) {
    var o = {
        user: []
    };
    
    o.getUser = function() {
        $http.get('/getuser').success(function(data) {
            angular.copy(data, o.user);
        });
    };
    
    o.logout = function () {
        $http.get('/logout').success(function() {
            o.user = [];
            window.location.href = "#/home"
        });
    }
    
    return o;
}]);

app.controller('MainCtrl', [
    '$scope',
    'auth',
    'images',
    function($scope, auth, images) {
        $scope.user = auth.user;
    }
]);
