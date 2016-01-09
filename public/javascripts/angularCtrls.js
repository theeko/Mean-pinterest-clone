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
  $scope.imgs = uimages.data;
  $scope.imgdelete = function(imgid){
    imgfac.deleteImg(imgid);
  };
}]);

angular.module("myApp").controller("allimagesCtrl", ["$scope","imgfac", "auth","allimages","currentUser",function($scope,imgfac,auth,allimages,currentUser){
  $scope.user = currentUser.data.displayName;
  $scope.imgs = allimages.data;
  $scope.imgdelete = function(imgid){
    imgfac.deleteImg(imgid);
  };
}]);

angular.module("myApp").controller("newimageCtrl", ["$scope","imgfac", "auth","currentUser",function($scope, imgfac,auth,currentUser){
  $scope.user = currentUser.data.displayName;
  $scope.imgs = imgfac.img;
  $scope.createNewImg = function () {
    console.log("newimgCtrl createNewImg func")
    console.log($scope.user);
    imgfac.postImage({title: $scope.imgtitle,desc: $scope.desc,url:$scope.imgurl, user: currentUser.data.displayName});
    $scope.imgtitle = "";
    $scope.desc = "";
    $scope.imgurl = "";
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
