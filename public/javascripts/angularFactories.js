angular.module("myApp").factory('auth', ['$http', function($http) {
    var o = {
        user: []
    };
    
    o.getUser = function() {
        return $http.get('/getuser').success(function(data) {
          o.user[0] = data.displayName;
          localStorage.setItem("user", data.displayName);
        });
    };
    
    o.logout = function () {
        return $http.get('/logout').success(function() {
          localStorage.setItem("user", null);
            window.location.href = "/";
        });
    }
    
    return o;
}]);

angular.module("myApp").factory("imgfac", ["auth", "$http", function (auth, $http) {
   var x = { img: [] };
    x.getImages = function (uname) {
        console.log("imgfac getImages");
        console.log(uname);
        return $http.get("/userimages/" + uname).success(function (data) {
            x.img = [];
            x.img.push(data);
        });
    };
    
    x.getAllImages = function () {
        return $http.get("/allimages").success(function (data) {
            x.img = [];
            angular.copy(data, x.img);
        });
    };
    
    x.upvote = function(data){
         $http.put("/upvoteimg", data).success(function(data) {
          console.log("imgfac upvote func succes");
          for(var i=0; i< x.img[0].length; i++){
              if(x.img[0][i]._id == data._id){
                   x.img[0][i].vote = data.vote;
                   window.location.reload();
              }
          }
        });
    }
   
   x.postImage = function(imglink) {
       console.log("imgfac postimage func");
        return $http.post('/newimage', imglink).success(function(data) {
            x.img.push(data);
        })
    }
    
    x.deleteImg = function(imgid) {
        $http.delete("/deleteimg/" + imgid).success(function (data) {
            window.location.reload();
        })
    }
   
   return x;
}]);