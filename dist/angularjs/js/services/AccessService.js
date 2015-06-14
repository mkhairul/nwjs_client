conAngular.factory('AccessService', ['$rootScope', '$compile', '$window', '$http', function($rootScope, $compile, $window, $http){
  var obj = {}
  
  obj.get = function($scope, varname){
    $http.get($rootScope.url + '/access').
    success(function(data, status, headers, config) {
        $scope[varname] = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error getting events');
      });
  }
  
  obj.save = function($scope, postData, callback){
    $http.post($rootScope.url + '/access/create', postData).
      success(function(data, status, headers, config) {
        console.log('saving access');
        console.log(data);
        $scope.new_event = false;
        if(callback != undefined)
        {
          callback();
        }
      }).
      error(function(data, status, headers, config) {
        console.log('error saving access');
      });
  }
  
  return obj;
}]);