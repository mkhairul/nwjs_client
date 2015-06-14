conAngular.controller('EventController', function($rootScope, $scope, $http, $timeout, $interval, EventService) {
  $scope.event = {};
  $scope.newEvent = function(){
    $scope.new_event = true;
  }
  
  EventService.get($scope, 'events');
  
  $scope.saveEvent = function(){
    EventService.save($scope, $scope.event, function(){
      EventService.get($scope, 'events');
    });
  }
});