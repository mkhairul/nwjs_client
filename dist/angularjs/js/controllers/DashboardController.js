conAngular.controller('DashboardController', function($state, $rootScope, $scope, $http, $timeout, $interval, RegistrationService, ActivateService, CardService, RFIDService, EventService) {

  // toast
  $timeout(function() {
    Materialize.toast('Welcome to KCSoft!', 1000);
  }, 1000);
  
  $http.get($rootScope.url + '/registrations/total').
    success(function(data){
      $scope.total_reg = data;
    }).
    error(function(data){
    });
  
  EventService.get($scope, 'events');
  $scope.card = CardService;
  
  $scope.actions = {};
  $scope.actions.cards = {};
  $scope.actions.participants = {};
  $scope.card.create('check_point');
  $scope.card.setLabel('Check Card', 'check_point');
  $scope.actions.cards.checkCard = function(card, name){
    if(card[name].status == 'active' || card[name].status == 'processing'){ 
      console.log('active / processing');
      console.log(card[name].status);
      return false; 
    }
    card.active(name);
    RFIDService.get_uid(card[name], function(){
      $scope.card.processing(name);
      console.log('change to processing');
      CardService.getData(card[name].id, name);
    });
  }
  $scope.card.create('disable_card');
  $scope.card.setLabel('Disable Card', 'disable_card');
  $scope.disableCard = function(card){
    $scope.card.active('disable_card');
    RFIDService.get_uid($scope.card.disable_card, function(){
      $scope.card.processing('disable_card');
      $scope.card.disable('disable_card');
    });
  }
  
  $scope.card.create('add_event');
  $scope.card.setLabel('Add Event', 'add_event');
  $scope.addEvent = function(card, name){
    if(card[name].status == 'active' || card[name].status == 'processing'){ 
      console.log('active / processing');
      console.log(card[name].status);
      return false; 
    }
    
    $scope.card.active(name);
    RFIDService.get_uid(card[name], function(){
      $scope.card.processing(name);
      console.log('change to processing');
      CardService.addEvent($scope.actions.participants.selected_event, 'add_event');
    });
  }
  $scope.selectEvent = function(event){
    console.log('select event');
    $scope.actions.participants.selected_event = event;
    $scope.actions.participants.event = false;
    $scope.actions.participants.event_card = true;
  }
  
  $scope.card.create('redeem');
  $scope.card.setLabel('Redeem', 'redeem');
  $scope.redeem = function(){
    console.log('redeem');
    $scope.card.active('redeem');
    RFIDService.get_uid($scope.card.redeem, function(){
      $scope.card.processing('redeem');
      $http.post($rootScope.url + '/redeem', {'uid': $scope.card.redeem.id}).
        success(function(data){
          $scope.card.inactive('redeem');;
          $scope.card.redeem.server_status = data.status;
          $scope.card.redeem.server_message = data.message;
        }).
        error(function(data){
        });
    });
  }
  
  $scope.card.create('add_point');
  $scope.card.setLabel('Add Points', 'add_point');
  $scope.card.create('remove_point');
  $scope.card.setLabel('Remove Points', 'remove_point');
  
  $scope.add_point = {}
  $scope.remove_point = {}
  
  $scope.addPoint = function(){
    $scope.card.active('add_point');
    RFIDService.get_uid($scope.card.add_point, function(){
      $scope.card.processing('add_point');
      CardService.addPoint($scope.card.add_point.id, $scope.add_point, 'add_point');
    });
  }
  
  $scope.removePoint = function(){
    $scope.card.active('remove_point');
    RFIDService.get_uid($scope.card.remove_point, function(){
      $scope.card.processing('remove_point');
      CardService.removePoint($scope.card.remove_point.id, $scope.remove_point, 'remove_point');
    });
  }
  
  
  
});