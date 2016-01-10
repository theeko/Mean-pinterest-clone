angular.module("myApp").controller('MainCtrl', [
    '$scope',
    'auth',
    'currentUser',
    function($scope, auth,currentUser) {
        $scope.user = currentUser;
    }
]);

angular.module("myApp").controller("ProfileCtrl", ["$scope","imgfac", "auth","uimages",function($scope,imgfac,auth,uimages){
  $scope.user = localStorage.getItem("user");
  // $scope.imgs = uimages.data;
  $scope.imgs = imgfac.img;
  $scope.imgdelete = function(imgid){
    imgfac.deleteImg(imgid);
  };
  $scope.upvoteimg = function(imgid){
    imgfac.upvote({imid: imgid, user: $scope.user});
  };
}]);


angular.module("myApp").controller("allimagesCtrl", ["$scope","imgfac", "auth","allimages","currentUser",function($scope,imgfac,auth,allimages,currentUser){
  $scope.user = currentUser.data.displayName;
  $scope.imgs = allimages.data;
  $scope.imgdelete = function(imgid){
    imgfac.deleteImg(imgid);
  };
  $scope.upvoteimg = function(imgid){
    imgfac.upvote({imid: imgid, user: $scope.user});
  };
}]);

angular.module("myApp").controller("newimageCtrl", ["$scope","imgfac", "auth","currentUser",function($scope, imgfac,auth,currentUser){
  $scope.user = localStorage.getItem("user");
  $scope.imgs = imgfac.img;
  $scope.createNewImg = function () {
    console.log("newimgCtrl createNewImg func");
    if(!$scope.imgtitle || !$scope.desc || !$scope.user || !$scope.imgurl){ 
      $scope.msg = "Fill all inputs"; 
      setTimeout( function () {
        $scope.msg = "";
      }, 2000);
    } else {
    console.log($scope.user);
    imgfac.postImage({title: $scope.imgtitle,desc: $scope.desc,url:$scope.imgurl, user: currentUser.data.displayName});
    $scope.msg = "Pin successfully created"; 
    $scope.imgtitle = "";
    $scope.desc = "";
    $scope.imgurl = "";
    setTimeout( function () {
        $scope.imgurl = "";
        window.location.href = "/#/profile";
      }, 2000);
    
    }
  }
  

}]);

angular.module("myApp").controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth) {
      $scope.user = auth.user;
      $scope.logOut = function(){
        auth.logout();  
      };
    }
]);
