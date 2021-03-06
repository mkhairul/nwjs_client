conAngular.controller('ClientController', function($rootScope, $scope, $http, $timeout, $interval, AccessService, CardService) {
  $scope.clientData = [];
  var retrieveClientData = function(){
    $http.get($rootScope.url + '/clients').
      success(function(data, status, headers, config) {
        $scope.clientData = data;
      }).
      error(function(data, status, headers, config){
        console.log('error retrieving clients');
      });
  }
  
  retrieveClientData();
  
  $scope.save = function(){
    $http.post($rootScope.url + '/client/create', $scope.client).
      success(function(data, status, headers, config) {
        $scope.new = false;
        retrieveClientData();
      }).
      error(function(data, status, headers, config){
        
      });
  }
  
  $scope.enableDisable = function(client){
    var enable = (client.enabled == 1) ? 0:1;
    $http.post($rootScope.url + '/client/enable', {'id':client.id, 'enable':enable}).
      success(function(data, status, headers, config) {
        retrieveClientData();
      }).
      error(function(data, status, headers, config){
        
      });
  }
  
  $scope.new = function(){ $scope.new = true; }
});