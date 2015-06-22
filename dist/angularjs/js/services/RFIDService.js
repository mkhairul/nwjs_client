conAngular.factory('RFIDService', ['$rootScope', '$compile', '$window', '$http', function($rootScope, $compile, $window, $http){
    var rfid = {};
  
    rfid.get_uid = function(obj, callback){
      var execPath = path.dirname( process.execPath ); 
      fs.exists(process.cwd() + '/reader/dist/rfid.exe', function (exists) {
        console.log(exists ? "rfid.exe it's there" : "no rfid.exe!");
      });
      child_process.exec('rfid.exe', {cwd:process.cwd() + '/reader/dist'}, function (err, stdout, stderr){
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
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
