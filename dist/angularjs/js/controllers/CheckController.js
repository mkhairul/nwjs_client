conAngular.controller('CheckController', function($rootScope, $scope, $http, $timeout, $interval, $state, CardService, RFIDService) {
  $scope.card = CardService;
  $scope.card.setLabel('Check Card');
  
  $scope.checkCard = function(){
    if($scope.card.status == 'active' || $scope.card.status == 'processing'){ 
      console.log('active / processing');
      console.log($scope.card.status);
      return false; 
    }
    
    $scope.card.active();
    RFIDService.get_uid($scope.card, function(){
      $scope.card.processing();
      console.log('change to processing');
      CardService.getData($scope.card.id);
    });
  }
  
  $scope.checkCard();
  
});