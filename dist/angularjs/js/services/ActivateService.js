conAngular.factory('ActivateService', ['$rootScope', '$compile', '$window', '$http', 'RFIDService', function($rootScope, $compile, $window, $http, RFIDService){
  var activate = {}
  
  activate.select_person = function(person){
    activate.person = person;
  }
  activate.select_event = function(event){
    activate.event = event;
  }
  activate.select_access = function(access)
  {
    activate.access = access;
  }
  
  activate.touch_card = function(card, person){
    RFIDService.get_uid(card, function(){
      card.processing();
      console.log('change to processing');
      
      $http.post($rootScope.url + '/activate', {'id':card.id, 
                                                'register_id':activate.person.id, 
                                                'event_id':activate.event.id, 
                                                'access_id':activate.access.id}).
        success(function(data, status, headers, config){
          console.log(data);
          card.inactive();
        }).
        error(function(data, status, headers, config){
          console.log('error activating card');
        })
    });
  }
  
  return activate;
}]);