conAngular.controller('AccessController', function($rootScope, $scope, $http, $timeout, $interval, AccessService) {
  $scope.event = {};
  $scope.new = function(){
    $scope.new = true;
  }
  
  AccessService.get($scope, 'access_list');
  
  $scope.save = function(){
    AccessService.save($scope, $scope.access, function(){
      AccessService.get($scope, 'access_list');
      $scope.new = false;
    });
  }
})