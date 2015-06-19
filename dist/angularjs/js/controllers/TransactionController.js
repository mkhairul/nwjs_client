conAngular.controller('TransactionController', function($rootScope, $scope, $http, $timeout, $interval, $state, CardService, RFIDService) {
  
  $scope.retrieveData = function(){
    console.log('retrieveData');
    $http.get($rootScope.url + '/transactions').
      success(function(data, status, headers, config) {
        $scope.transactions = data;
      }).
      error(function(data, status, headers, config){
        console.log('error retrieving transactions');
      });
  }
  
  $scope.retrieveData();
  
  $scope.deleteData = function(trans)
  {
    console.log('test');
    $http.post($rootScope.url + '/transaction/delete', {'id':trans.id}).
      success(function(data, status, headers, config) {
        $scope.retrieveData();
      }).
      error(function(data, status, headers, config){
        console.log('error retrieving transactions');
      });
  }
  
  
  
});