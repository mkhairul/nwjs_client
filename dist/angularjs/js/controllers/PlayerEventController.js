conAngular.controller('PlayerEventController', function($state, $rootScope, $scope, $http, $timeout, $interval, $state, CardService, RFIDService) {
  if($rootScope.selected_event == undefined)
  {
      $state.go('/dashboard');
  }
  $scope.loadPlayers = function(){
      $http.get($rootScope.url + '/event/players/' + $rootScope.selected_event.id).
        success(function(data, status, headers, config) {
            $scope.players = data.cards
          }).
          error(function(data, status, headers, config) {
            console.log('error getting events');
          });
  }
  
  $scope.loadPlayers();
    
  $scope.removePlayer = function(card){
      $http.post($rootScope.url + '/event/player/remove', { 'cards_id': card.id, 'events_id':$rootScope.selected_event.id }).
        success(function(data, status, headers, config) {
            $scope.loadPlayers();
          }).
          error(function(data, status, headers, config) {
            console.log('error removing player');
          });
  }
  
})