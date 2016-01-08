angular.module("myApp").controller('MainCtrl', [
    '$scope',
    'auth',
    'currentUser',
    function($scope, auth,currentUser) {
        $scope.user = currentUser;
    }
]);

angular.module("myApp").controller("ProfileCtrl", ["$scope","imgfac", "auth",function($scope,imgfac,auth){
  $scope.user = auth.getUser();
  console.log($scope.user);
  $scope.imgs = imgfac.img;
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
  
  // rewrite deletcurrentUser andpolleck upvote
  $scope.deleteimg = function(id, poll){
    if($scope.user == img.author){
    imgfac.delete(id);
     window.location.href = "/";
    }
  };
  $scope.upvote= function(poll, pollid,index){
    if(!!$scope.user == false ){ return; }
    imgfac.upvote(poll, pollid,index);
  };

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
