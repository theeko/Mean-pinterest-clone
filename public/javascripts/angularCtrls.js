angular.module("myApp").controller('MainCtrl', [
    '$scope',
    'auth',
    'currentUser',
    function($scope, auth,currentUser) {
        $scope.user = currentUser;
    }
]);

angular.module("myApp").controller("ProfileCtrl", ["$scope","imgfac", "auth","currentUser",function($scope, auth,imgfac,currentUser){
  $scope.user = auth.getUser;
  $scope.imgs = imgfac.img;
}]);

angular.module("myApp").controller("newimageCtrl", ["$scope","imgfac", "auth",function($scope, auth,imgfac){
  $scope.user = auth.getUser;
  $scope.imgs = imgfac.img;
  $scope.createNewImg = function (imgtitle,desc,imgurl) {
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
