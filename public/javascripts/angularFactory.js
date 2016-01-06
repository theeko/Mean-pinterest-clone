angular.module("myApp").factory('auth', ['$http', function($http) {
    var o = {
        user: []
    };
    
    o.getUser = function() {
        return $http.get('/getuser').success(function(data) {
          o.user[0] = data.username;
        });
    };
    
    o.logout = function () {
        return $http.get('/logout').success(function() {
            window.location.href = ""
        });
    }
    
    return o;
}]);

angular.module("myApp").factory("imgFac", ["auth", "http", function (auth, http) {
   var x = { img: [] };
    x.getImages = function (username) {
        return http.get("/userimages/" + username).success(function (data) {
            x.img = [];
            angular.copy(data, x.img);
        });
    };
    
    x.getAllImages = function () {
        return http.get("/allimages/").success(function (data) {
            x.img = [];
            angular.copy(data, x.img);
        });
    };
   x.postImage = function (username) {
     $http.post()
   }
}])