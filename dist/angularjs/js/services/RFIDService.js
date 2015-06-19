conAngular.factory('RFIDService', ['$rootScope', '$compile', '$window', '$http', function($rootScope, $compile, $window, $http){
    var rfid = {};
  
    rfid.get_uid = function(obj, callback){
      var execPath = path.dirname( process.execPath );   
      child_process.exec(process.cwd() + '/reader/dist/rfid.exe', function (err, stdout, stderr){
          if (err) {
              console.log("child processes failed with error code: " +
                  err.code);
          }
          else
          {
            stdout = stdout.trim();
            console.log('uid retrieved');
            obj.id = stdout;
            obj.uid = stdout;
            console.log('UID: ' + obj.id);
            callback();
          }
      });
    }

                                        
    return rfid;
}]);
