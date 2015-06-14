conAngular.controller('DashboardController', function($state, $rootScope, $scope, $http, $timeout, $interval, RegistrationService, ActivateService, CardService, RFIDService) {

  // toast
  $timeout(function() {
    Materialize.toast('Welcome to KCSoft!', 1000);
  }, 1000);
  
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
  
  $scope.activateCard = function(person){
    console.log($state); 
    ActivateService.select_person(person);
    $state.go('/activate');
    return false;
  };
  
  $scope.card = CardService;
  $scope.card.create('add_point');
  $scope.card.setLabel('Add Points', 'add_point');
  $scope.card.create('remove_point');
  $scope.card.setLabel('Remove Points', 'remove_point');
  
  $scope.add_point = {}
  $scope.remove_point = {}
  
  $scope.addPoint = function(){
    $scope.card.active('add_point');
    RFIDService.get_uid($scope.card.add_point, function(){
      $scope.card.processing('add_point');
      CardService.addPoint($scope.card.add_point.id, $scope.add_point, 'add_point');
    });
  }
  
  $scope.removePoint = function(){
    $scope.card.active('remove_point');
    RFIDService.get_uid($scope.card.remove_point, function(){
      $scope.card.processing('remove_point');
      CardService.removePoint($scope.card.remove_point.id, $scope.remove_point, 'remove_point');
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
  // total displayable columns
  $scope.displayable_columns = 0;
  for(var i in $scope.column_names){
    if($scope.column_names[i].display == true)
    {
      $scope.displayable_columns += 1;
    }
  }
  
  RegistrationService.get($scope, 'tablesData');

  $scope.select_person = function(person){
    $scope.is_person_selected = true;
    $scope.selected_person = person;
  }
  
  $scope.closeEditAdd = function(){
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
  
  
});