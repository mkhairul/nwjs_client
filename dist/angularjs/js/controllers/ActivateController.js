conAngular.controller('ActivateController', function($rootScope, $scope, $http, $timeout, $interval, $state, EventService, ActivateService, AccessService, CardService) {
  
  if(ActivateService.person == undefined)
  {
    $state.go('/dashboard');
  }
  
  $scope.activate = ActivateService;
  $scope.person = ActivateService.person;
  $scope.card = CardService;
  $scope.card.setLabel('Touch Card');
  
  EventService.get($scope, 'events');
  AccessService.get($scope, 'access_list');
  
  $scope.selectEvent = function(event){
    ActivateService.select_event(event);
    $scope.event = event;
  }
  
  $scope.selectAccess = function(access){
    ActivateService.select_access(access);
    $scope.access = access;
    
    $scope.card.active();
    ActivateService.touch_card($scope.card);
    
  }
  
});