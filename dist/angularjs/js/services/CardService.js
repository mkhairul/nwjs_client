conAngular.factory('CardService', ['$rootScope', '$compile', '$window', '$http', 'RegistrationService', 'EventService', function($rootScope, $compile, $window, $http, RegistrationService, EventService){
  var obj = {}
  
  obj.label = '';
  obj.label_default = '';
  obj.label_active = 'Touch Card';
  obj.label_processing = 'Searching';
  obj.css = '';
  obj.css_default = '';
  obj.css_active = 'green darken-2';
  obj.css_processing = 'green darken-2';
  obj.status = 'inactive';
  obj.server_status = '';
  obj.server_message = '';
  
  obj.setLabel = function(str, name){
    if(name != undefined)
    {
      obj[name].label_default = str;
      obj[name].label = str;
    }
    else
    {
      obj.label_default = str;
      obj.label = str;
    }
  }
  
  obj.getLabel = function(name){
    return (name != undefined) ? obj[name].label:obj.label;
  }
  
  obj.setLabelActive = function(str, name){
    if(name != undefined)
    {
      obj[name].label_active = str;
    }
    else
    {
      obj.label_active = str;
    }
  }
  
  obj.getLabelActive = function(name){
    return (name != undefined) ? obj[name].label_active:obj.label_active;
  }
  
  obj.setLabelProcessing = function(str, name){
    if(name != undefined)
    {
      obj[name].label_processing = str;
    }
    else
    {
      obj.label_processing = str;
    }
  }
  
  obj.getLabelProcessing = function(name){
    return (name != undefined) ? obj[name].label_processing:obj.label_processing;
  }
  
  obj.inactive = function(name){
    if(name != undefined)
    {
      obj[name].label = obj[name].label_default;
      obj[name].css = obj[name].css_default;
      obj[name].status = 'inactive';
    }
    else
    {
      obj.label = obj.label_default;
      obj.css = obj.css_default;
      obj.status = 'inactive';
    }
  }
  
  obj.active = function(name){
    if(name != undefined)
    {
      obj[name].label = obj[name].label_active;
      obj[name].css = obj[name].css_active;
      obj[name].status = 'active';
    }
    else
    {
      obj.label = obj.label_active;
      obj.css = obj.css_active;
      obj.status = 'active';
    }
  }
  
  obj.processing = function(name){
    if(name != undefined)
    {
      obj[name].label = obj[name].label_processing;
      obj[name].css = obj[name].css_processing;
      obj[name].status = 'processing';
    }
    else
    {
      obj.label = obj.label_processing;
      obj.css = obj.css_processing;
      obj.status = 'processing';
    }
  }
  
  // name or object
  obj.disable = function(name){
    var card = (typeof(name) == 'string') ? obj[name]:((typeof(name) == 'object') ? name:obj);
    console.log(card);
    $http.post($rootScope.url + '/card/disable', card).
      success(function(data, status, headers, config){
        console.log(typeof(name));
        if(typeof(name) == 'string')
        {
          obj.inactive(name);
          obj[name].server_status = data.status;
          obj[name].server_message = data.message;
          obj[name].active = 0;
        }
        else
        {
          obj.inactive();
          obj.server_status = data.status;
          obj.server_message = data.message;
          obj.active = 0;
        }
        card.active = 0;
      }).
      error(function(data, status, headers, config){
        console.log('unable to disable card');
        console.log(data);
      });
  }
  
  obj.enable = function(name){
    var card = (typeof(name) == 'string') ? obj[name]:((typeof(name) == 'object') ? name:obj);
    $http.post($rootScope.url + '/card/enable', card).
      success(function(data, status, headers, config){
        
        if(typeof(name) == 'string')
        {
          obj.inactive(name);
          obj[name].server_status = data.status;
          obj[name].server_message = data.message;
          obj[name].active = 1;
        }
        else
        {
          obj.inactive();
          obj.server_status = data.status;
          obj.server_message = data.message;
          obj.active = 1;
        }
        card.active = 1;
      }).
      error(function(data, status, headers, config){
        console.log('unable to enable card');
        console.log(data);
      });
  }
  
  obj.getAll = function(){
    $http.get($rootScope.url + '/cards').
    success(function(data, status, headers, config){
      obj.card_list = data;
    }).
    error(function(data, status, headers, config){
      console.log('unable to retrieve all cards');
    });
  }
  
  $http.get($rootScope.url + '/card/total').
    success(function(data, status, headers, config){
      obj.total = data;
    }).
    error(function(data, status, headers, config){
      console.log('unable to retrieve total cards');
    });
  
  obj.getData = function(id, name){
    $http.post($rootScope.url + '/check', {'id':id}).
      success(function(data, status, headers, config){
        console.log(data);
        if(name != undefined)
        {
          obj[name].data = data.card;
          obj[name].points = data.points.total;
          if(obj[name].data)
          {
            RegistrationService.find(obj[name].data.register_id, obj[name].data, 'person');
          }
          obj.inactive(name);
        }
        else
        {
          obj.data = data.card;
          obj.points = data.points.total;
          if(obj.data)
          {
            RegistrationService.find(obj.data.register_id, obj.data, 'person');
          }
          obj.inactive();
        }
      }).
      error(function(data, status, headers, config){
        console.log('error checking card');
      })
  }
  
  obj.addPoint = function(id, someObj, name){
    $http.post($rootScope.url + '/add_point', {'id':id, 'points':someObj.points, 'reason':someObj.reason}).
      success(function(data, status, headers, config){
        console.log(data);
        if(name != undefined)
        {
          obj.inactive(name);
          obj[name].server_status = data.status;
          obj[name].server_message = data.message;
        }
        else
        {
          obj.inactive();
          obj.server_status = data.status;
          obj.server_message = data.message;
        }
        someObj.points = '';
      }).
      error(function(data, status, headers, config){
        console.log('error adding points');
        if(name != undefined)
        {
          obj.inactive(name);
        }
        else
        {
          obj.inactive();
        }
      })
  }
  
  obj.addEvent = function(event, name){
    var card = (typeof(name) == 'string') ? obj[name]:obj;
    $http.post($rootScope.url + '/card/add_event', { 'uid':card.uid, 'events_id': event.id }).
      success(function(data){
        if(name != undefined)
        {
          obj.inactive(name);
          obj[name].server_status = data.status;
          obj[name].server_message = data.message;
        }
        else
        {
          obj.inactive();
          obj.server_status = data.status;
          obj.server_message = data.message;
        }
      }).
      error(function(data, status, headers, config){
        console.log('unable to retrieve total cards');
      });
  }
  
  obj.removePoint = function(id, obj, name){
    $http.post($rootScope.url + '/remove_point', {'id':id, 'points':someObj.points}).
      success(function(data, status, headers, config){
        console.log(data);
        if(name != undefined)
        {
          obj.inactive(name);
          obj[name].server_status = data.status;
          obj[name].server_message = data.message;
        }
        else
        {
          obj.inactive();
          obj.server_status = data.status;
          obj.server_message = data.message;
        }
        someObj.points = '';
      }).
      error(function(data, status, headers, config){
        console.log('error remove points');
        if(name != undefined)
        {
          obj.inactive(name);
        }
        else
        {
          obj.inactive();
        }
      })
  }
  
  obj.create = function(name){
    obj[name] = {};
    obj[name].label = '';
    obj[name].label_default = '';
    obj[name].label_active = obj.label_active;
    obj[name].label_processing = obj.label_processing;
    obj[name].css = '';
    obj[name].css_default = '';
    obj[name].css_active = obj.css_active;
    obj[name].css_processing = obj.css_processing;
    obj[name].status = obj.status;
  }
  
  return obj;
  
}]);