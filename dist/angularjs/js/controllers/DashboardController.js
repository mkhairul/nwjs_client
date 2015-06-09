conAngular.controller('DashboardController', function($state, $rootScope, $scope, $http, $timeout, $interval) {

  // toast
  $timeout(function() {
    Materialize.toast('Welcome to KCSoft!', 1000);
  }, 1000);
  
  $scope.card = {};
  $scope.card.points = 0;
  
  $scope.main_actions = [
    { name: 'check_points', label_default: 'Check Card', label_active: 'Touch Card', label_processing: 'Searching' },
    { name: 'activate_card', label_default: 'Activate', label_active: 'Touch Card', label_processing: 'Searching'  },
    { name: 'add_point', label: 'Add Points' },
    { name: 'remove_points', label: 'Remove Points' }
  ];
  
  for(var i in $scope.main_actions){
    $scope[$scope.main_actions[i].name] = {}
    $scope[$scope.main_actions[i].name].active = false;
    $scope[$scope.main_actions[i].name].card = $scope.card;
    if($scope.main_actions[i].label_default)
    {
      $scope[$scope.main_actions[i].name].label = $scope.main_actions[i].label_default;
      $scope[$scope.main_actions[i].name].label_default = $scope.main_actions[i].label_default;
    }
    else
    {
      $scope[$scope.main_actions[i].name].label = $scope.main_actions[i].label;
    }
    if($scope.main_actions[i].label_active)
    {
      $scope[$scope.main_actions[i].name].label_active = $scope.main_actions[i].label_active;
    }
    if($scope.main_actions[i].label_processing)
    {
      $scope[$scope.main_actions[i].name].label_processing = $scope.main_actions[i].label_processing;
    }
  }
  
  $scope.check_points.card = $scope.card;
  $scope.checkPoints = function(){
    $scope.check_points.active = true
    $scope.check_points.label = $scope.check_points.label_active;
    get_uid($scope.check_points, $scope.check_points.label_default, function(){
      $scope.check_points.active = true;
      $scope.check_points.label = $scope.check_points.label_processing;
      $scope.$apply();
      $http.get('http://localhost:7777/rfid_server/public/points/' + $scope.check_points.card.id).
        success(function(data, status, headers, config){
          console.log(data);
          $scope.check_points.active = false;
          $scope.check_points.label = $scope.check_points.label_default;
        }).
        error(function(data, status, headers, config){
          console.log('error checking points');
        })
    });
  };
  
  $scope.activate_card.card = $scope.card;
  $scope.activate_card.status = '';
  $scope.activate_card.alert = {
      show: false,
      status: '',
      message: ''
  };
  $scope.activateCard = function(person){
    console.log($state); 
    $state.go('/activate');
    return false;
    $scope.activate_card.active = true
    person.card = $scope.activate_card.label = $scope.activate_card.label_active;
    get_uid($scope.activate_card, $scope.activate_card.label_default, function(){
      $scope.activate_card.active = true;
      person.card = $scope.activate_card.label = $scope.activate_card.label_processing;
      $scope.$apply();
      $http.post('http://localhost:7777/rfid_server/public/activate', {'id':$scope.activate_card.card.id, 'register_id':person.id}).
        success(function(data, status, headers, config){
          console.log(data);
          $scope.activate_card.status = data.message;
          $scope.activate_card.active = false;
          person.card = $scope.activate_card.label = $scope.activate_card.label_default;
        }).
        error(function(data, status, headers, config){
          console.log('error checking points');
        })
      });
  };
  // wooot
  
  $scope.add_point = {};
  $scope.add_point.label = 'Add Points';
  $scope.add_point.active = false;
  $scope.add_point.card = $scope.card;
  $scope.addPoints = function(){
    console.log('add points');
    $scope.add_point.active = true;
    $scope.add_point.label = 'Touch card';
    get_uid($scope.add_point, 'Add Points', function(){
      $scope.add_point.active = true;
      $scope.add_point.label = 'Searching';
      $scope.$apply();
      $http.post('http://localhost:7777/rfid_server/public/add_point', {'id': $scope.activate_card.card.id, 'points': $scope.add_point.points}).
        success(function(data, status, headers, config){
          console.log(data);
          $scope.add_point.status = data.message;
          $scope.add_point.active = false;
          $scope.add_point.label = 'Add Points';
        }).
        error(function(data, status, headers, config){
          console.log('error adding points');
        })
      });
  }
  
  var get_uid = function(obj, inactive_label, callback){
    var execPath = path.dirname( process.execPath );   
    child_process.exec(process.cwd() + '/reader/dist/rfid.exe', function (err, stdout, stderr){
        if (err) {
            console.log("child processes failed with error code: " +
                err.code);
        }
        else
        {
          stdout = stdout.trim();
          obj.card.id = stdout;
          obj.active = false;
          obj.label = inactive_label;
          $scope.$apply();
          callback();
        }
    });
  }
  

  $scope.stats = {}
  $scope.column_names = [
      { 'name': 'Name', 'column': 'name', display: true },
      { 'name': 'Email', 'column':'email', display: false },
      { 'name': 'Phone', 'column':'phone', display: true },
      { 'name': 'DCI', 'column':'dci', display: true },
      { 'name': 'Paid', 'column':'paid', display: true },
      { 'name': 'Payment Info', 'column':'payment_info', display: false },
      { 'name': 'MiscInfo', 'column':'misc_info', display: false },
      { 'name': 'Date', 'column':'created_at', edit: false, display: false },
      { 'name': 'Country', 'column':'country', display: true },
      { 'name': 'Type', 'column':'type', display: true },
      { 'name': 'Card', 'column':'card', display: true }
    
  ];
  $scope.tablesData = [];
  
   $http.get('http://localhost:7777/rfid_server/public/registrations').
      success(function(data, status, headers, config) {
        $scope.tablesData = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error loading registration data');
      });
  

  $scope.select_person = function(person){
    $scope.is_person_selected = true;
    $scope.selected_person = person;
    console.log('selected user');
    console.log(person);
    console.log($scope.selected_person);
  }
  
  $scope.closeEditAdd = function()
  {
      $scope.is_person_selected = false;
      $scope.create_user = false
      $scope.selected_person = {}
  }
  
  $scope.selected_person = {};
  $scope.is_person_selected = false;
  $scope.create_user = false;
  $scope.alert = {
      show: false,
      status: '',
      message: ''
  };
    
  $scope.sendReceipt = function(){
      Materialize.toast('Sending email, please wait..', 2000);
      $http.get('http://localhost:7777/rfid_server/public/registrations/receipt/' + $scope.selected_person.id).
          success(function(data, status, headers, config) {
            console.log('sent?');
            console.log(data);
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
            $scope.is_person_selected = false;
            $scope.selected_person = {}
          }).
          error(function(data, status, headers, config) {
            console.log('error sending receipt');
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
          });
  }
    
  $scope.deleteModal = function(){
      $http.post('http://localhost:7777/rfid_server/public/registrations/delete', $scope.selected_person).
          success(function(data, status, headers, config) {
            console.log('deleted?');
            console.log(data);
            
            // delete from tablesData
            for(var i = 0, len = $scope.tablesData.length; i < len; i++) {
                if( $scope.tablesData[i].id === $scope.selected_person.id ){
                    $scope.tablesData.splice(i, 1);
                    break;
                }        
            }
          
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
            $scope.is_person_selected = false;
            $scope.selected_person = {}
            $scope.create_user = false;
            
          }).
          error(function(data, status, headers, config) {
            console.log('error deleting registration data');
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
          });
  }
    
  $scope.saveUser = function(){
      //console.log($scope.selected_person);
      
      $http.post('registrations/save', $scope.selected_person).
          success(function(data, status, headers, config) {
            console.log('saved?');
            console.log(data);
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
            $scope.is_person_selected = false;
            $scope.tablesData.push($scope.selected_person);
            $scope.selected_person = {}
            $scope.create_user = false;
          }).
          error(function(data, status, headers, config) {
            console.log('error saving registration data');
            $scope.alert.show = true;
            $scope.alert.status = data.status;
            $scope.alert.message = data.message;
          });
  }

  // table 4 testing
  
  $scope.table4opts = {
    "iDisplayLength": 10,
    "bLengthChange": false,
    "filter": true,
    "dom": 'Tlfrtip',
    "tableTools": {
      "sSwfPath": "../assets/dataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
    },
    "language": {
        "emptyTable": "Loading Data"
    }
  }
  
  /*
  $scope.table4opts = {
    "ajax": "http://localhost:7777/rfid_server/public/registrations/aaData",
    "scrollY": "200px",
    "dom": "frtiS",
    "deferRender": true
  }
  */
  
  // table 2
  $scope.table2opts = {
    "iDisplayLength": 5,
    "aLengthMenu": [
      [5, 10, 25, 50, -1],
      [5, 10, 25, 50, "all"]
    ]
  }
  
  
});