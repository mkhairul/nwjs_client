conAngular.factory('RegistrationService', ['$rootScope', '$compile', '$window', '$http', 
                                      function($rootScope, $compile, $window, $http){
    var obj = {};
    obj.get = function(scope, varname){
      $http.get($rootScope.url + '/registrations').
        success(function(data, status, headers, config) {
          scope[varname] = data;
        }).
        error(function(data, status, headers, config) {
          console.log('error loading registration data');
        });
    }
    obj.find = function(id, scope, varname){
      $http.post($rootScope.url + '/registration/find', {'id':id}).
        success(function(data, status, headers, config) {
          scope[varname] = data;
        }).
        error(function(data, status, headers, config) {
          console.log('error loading registration data');
        });
    }
    return obj;
}]);
