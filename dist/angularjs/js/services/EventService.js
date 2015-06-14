conAngular.factory('EventService', ['$rootScope', '$compile', '$window', '$http', function($rootScope, $compile, $window, $http){
  var obj = {}
  
  obj.get = function($scope, varname){
    $http.get($rootScope.url + '/events').
    success(function(data, status, headers, config) {
        $scope[varname] = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error getting events');
      });
  }
  
  obj.find = function(id, scope, varname){
    $http.post($rootScope.url + '/event/find', {'id':id}).
      success(function(data, status, headers, config) {
        scope[varname] = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error loading registration data');
      });
  }
  
  obj.save = function($scope, postData, callback){
    $http.post($rootScope.url + '/event/create', postData).
      success(function(data, status, headers, config) {
        console.log('saving event');
        console.log(data);
        $scope.new_event = false;
        if(callback != undefined)
        {
          callback();
        }
      }).
      error(function(data, status, headers, config) {
        console.log('error sending receipt');
      });
  }
  
  return obj;
  
}]);