conAngular.controller('CardController', function($rootScope, $scope, $http, $timeout, $interval, AccessService, CardService) {
  $scope.card = CardService;
  $scope.card.getAll();
  
  $scope.disable = function(card){
    $scope.card.disable(card);
  }
  $scope.enable = function(card){
    $scope.card.enable(card);
  }
});