angular.module("myApp").controller('MainCtrl', [
    '$scope',
    'auth',
    'currentUser',
    function($scope, auth,currentUser) {
        $scope.user = currentUser;
    }
]);

angular.module("myApp").controller("ProfileCtrl", ["$scope","userimgs", "auth", "userPromise",function($scope, auth,userimgs){
  $scope.user = auth.getUser();
  $scope.imgs = userimgs;
}]);

angular.module("myApp").controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth) {
      $scope.user = auth.user;
      $scope.logOut = function(){
        auth.logout();  
      };
      $scope.getUser = function () {
        auth.getUser();
      };
    }
]);
