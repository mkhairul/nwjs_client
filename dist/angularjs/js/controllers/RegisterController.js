conAngular.controller('RegisterController', function($rootScope, $scope, $http, $timeout, $interval, $state, AccessService, CardService, RegistrationService, ActivateService) {
  RegistrationService.get($scope, 'tablesData');
  $scope.selected_person = {};
  $scope.is_person_selected = false;
  $scope.create_user = false;
  $scope.alert = {
      show: false,
      status: '',
      message: ''
  };
    
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
  
  $scope.activateCard = function(person){
    console.log($state); 
    ActivateService.select_person(person);
    $state.go('/activate');
    return false;
  };

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
      
      $http.post($rootScope.url + '/registrations/save', $scope.selected_person).
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