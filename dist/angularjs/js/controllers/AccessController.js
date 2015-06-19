conAngular.controller('AccessController', function($rootScope, $scope, $http, $timeout, $interval, AccessService) {
  $scope.event = {};
  $scope.new_access = false;
  
  $scope.newAccess = function(){
    $scope.new_access = true;
  }
  
  AccessService.get($scope, 'access_list');
  
  $scope.save = function(){
    AccessService.save($scope, $scope.access, function(){
      AccessService.get($scope, 'access_list');
      $scope.new_access = false;
    });
  }
})