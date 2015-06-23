conAngular.controller('EventController', function($state, $rootScope, $scope, $http, $timeout, $interval, EventService) {
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
  
  $scope.viewPlayers = function(event){
      $rootScope.selected_event = event;
      $state.go('/players_in_events');
  }
});