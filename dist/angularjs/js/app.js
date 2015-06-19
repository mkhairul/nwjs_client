/*
 * Con Full Assets List
 *
 * Usage:
 * var result = conAssets('simpleWeather,d3,nvd3')
 * result ==>
 *  [
 *    '../assets/simpleWeather/jquery.simpleWeather.min.js',
 *    '../assets/d3/d3.min.js',
 *    '../assets/nvd3/nv.d3.min.css',
 *    '../assets/nvd3/nv.d3.min.js',
 *    '../assets/nvd3/angular-nvd3.min.js'
 *  ]
 */
window.conAssets = function(get) {
  var list = {
    simpleWeather: ['../assets/simpleWeather/jquery.simpleWeather.min.js'],

    sparkline: [
      '../assets/sparkline/jquery.sparkline.min.js',
      '../assets/angularjs-sparkline/angularjs.sparkline.js'
    ],

    flot: [
      '../assets/flot/jquery.flot.min.js',
      '../assets/flot/jquery.flot.time.min.js',
      '../assets/flot/jquery.flot.pie.min.js',
      '../assets/flot/jquery.flot.tooltip.min.js',
      '../assets/flot/jquery.flot.categories.min.js',
      '../assets/angularjs-flot/angular-flot.js'
    ],

    nvd3: [
      '../assets/d3/d3.min.js',
      '../assets/nvd3/nv.d3.min.css',
      '../assets/nvd3/nv.d3.min.js',
      '../assets/angularjs-nvd3/angular-nvd3.min.js'
    ],

    rickshaw: [
      '../assets/d3/d3.min.js',
      '../assets/rickshaw/rickshaw.min.css',
      '../assets/rickshaw/rickshaw.min.js',
      '../assets/angularjs-rickshaw/rickshaw-angularjs.js'
    ],

    markitup: [
      '../assets/markitup/skins/_con/style.css',
      '../assets/markitup/sets/default/style.css',
      '../assets/markitup/sets/default/set.js',
      '../assets/markitup/jquery.markitup.js'
    ],

    ckeditor: ['../assets/ckeditor/ckeditor.js'],

    select2: [
      '../assets/select2/css/select2.min.css',
      '../assets/select2/js/select2.full.min.js'
    ],

    tagsinput: [
      '../assets/jquery-tags-input/jquery.tagsinput.css',
      '../assets/jquery-tags-input/jquery.tagsinput.js'
    ],

    dropzone: [
      '../assets/dropzone/dropzone.min.css',
      '../assets/dropzone/dropzone.min.js'
    ],

    clockpicker:[
      '../assets/jquery-clockpicker/jquery-clockpicker.min.css',
      '../assets/jquery-clockpicker/jquery-clockpicker.min.js'
    ],

    pikaday: [
      '../assets/pikaday/pikaday.css',
      '../assets/pikaday/pikaday.js',
      '../assets/pikaday/pikaday.jquery.js'
    ],

    spectrum: [
      '../assets/spectrum/spectrum.css',
      '../assets/spectrum/spectrum.js'
    ],

    inputmask: ['../assets/jquery-input-mask/jquery.inputmask.bundle.min.js'],

    parsley: ['../assets/parsley/parsley.min.js'],
    
    gmaps: ['../assets/gmaps/gmaps.min.js'],

    jvectormap: [
      '../assets/jquery-jvectormap/jquery-jvectormap.css',
      '../assets/jquery-jvectormap/jquery-jvectormap.min.js',
      '../assets/jquery-jvectormap/jquery-jvectormap-world-mill-en.js',
      '../assets/jquery-jvectormap/gdp-data.js',
      '../assets/angulajs-jvectormap/angularjs-jvectormap.js'
    ],

    dataTables: [
      '../assets/dataTables/js/jquery.dataTables.min.js',
      '../assets/dataTables/extensions/TableTools/js/dataTables.tableTools.min.js',
      '../assets/dataTables/extensions/Scroller/js/dataTables.scroller.min.js',
      '../assets/angularjs-dataTables/angular-datatables.min.js'
    ],

    fullcalendar: [
      '../assets/fullcalendar/fullcalendar.min.css',
      '../assets/fullcalendar/moment.min.js',
      '../assets/fullcalendar/jquery-ui.custom.min.js',
      '../assets/fullcalendar/fullcalendar.min.js'
    ],

    sortable: ['../assets/sortable/Sortable.min.js']
  };

  // return result array
  var get = get.split(',');
  var result = [];
  for(var k in get) {
    if(typeof list[ get[k] ] !== 'undefined') {
      for(var n in list[ get[k] ]) {
        result.push( list[ get[k] ][n] );
      }
    }
  }

  return result;
}


/*
 * Con AngularJS Version
 */
var conAngular = angular.module("conAngular", [
  "ui.router", 
  "ui.materialize", 
  "oc.lazyLoad",  
  "ngSanitize"
]); 

// Config ocLazyLoader
conAngular.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // lazy load config
  });
}]);


// Global Options
conAngular.factory('settings', ['$rootScope', function($rootScope) {
  var settings = {
    rtl: false, // rtl mode
    navbar: {
      dark:   false, // dark color scheme
      static: false, // static
      under:  false  // navbar under sidebar
    },
    sidebar: {
      hideToSmall:     true,    // hide to small sidebar
      static:          false,   // static
      gestures:        true,    // gestures support
      light:           false,   // light color scheme
      overlapContent:  false,   // Overlay content when opened
      effect:          'shrink' // show effect: [shrink, push, overlay]
    },
    chat: {
      light: false // light color scheme
    }
  };

  $rootScope.settings = settings;

  return settings;
}]);



// App Controller
conAngular.controller('AppController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
  $scope.$on('$viewContentLoaded', function() {
    // init plugins
    conApp.initPlugins();
    conApp.initCards();
    conApp.initCardTodo();
    conApp.initCardWeather();
  });
}]);

// Navbar Controller
conAngular.controller('NavbarController', ['$rootScope','$scope', function($rootScope, $scope) {
  var gui = require('nw.gui');
  var win = gui.Window.get();
  
  $rootScope.access_cache = {};
  $rootScope.access_cache.username = sessionStorage.username;
  $rootScope.access_cache.password = sessionStorage.password;
  $rootScope.access_cache.name = sessionStorage.name;
  $rootScope.access_cache.key = sessionStorage.key;
  console.log($rootScope.access_cache);
  
  $scope.closeApp = function(){
    console.log('trying to close');
    win.close();
  }
  $scope.$on('$includeContentLoaded', function() {
  });
}]);

// Sidebar Controller
conAngular.controller('SidebarController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    conApp.initSidebar();
  });
}]);

// Search Controller
conAngular.controller('SearchController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    conApp.initSearchBar();
  });
}]);

// Chat Controller
conAngular.controller('ChatController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    conApp.initChat();
  });
}]);


// Setup Rounting For All Pages
conAngular.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/dashboard.html");  
  
    // pages
  $stateProvider
    // Dashboard
    .state('/dashboard', {
      url: "/dashboard.html",
      templateUrl: "tpl/dashboard.html",
      controller: "DashboardController",
      data: {
        pageTitle: 'Dashboard',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Dashboard',
            href: '#/dashboard.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/event', {
      url: "/event.html",
      templateUrl: "tpl/event.html",
      controller: "EventController",
      data: {
        pageTitle: 'Event',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Event',
            href: '#/event.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/access', {
      url: "/access.html",
      templateUrl: "tpl/access.html",
      controller: "AccessController",
      data: {
        pageTitle: 'Access',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Access',
            href: '#/access.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/card', {
      url: "/card.html",
      templateUrl: "tpl/card.html",
      controller: "CardController",
      data: {
        pageTitle: 'Card List',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Cards',
            href: '#/card.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/check', {
      url: "/check.html",
      templateUrl: "tpl/check.html",
      controller: "CheckController",
      data: {
        pageTitle: 'Check Card',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Check Card',
            href: '#/check.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/client', {
      url: "/client.html",
      templateUrl: "tpl/client.html",
      controller: "ClientController",
      data: {
        pageTitle: 'Clients',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Clients',
            href: '#/client.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/activate', {
      url: "/activate.html",
      templateUrl: "tpl/activate.html",
      controller: "ActivateController",
      data: {
        pageTitle: 'Activate',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#/dashboard.html'
          }, {
            title: 'Activate',
            href: '#/activate.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })

    // Angular Options
    .state('/angular-settings', {
      url: "/angular-settings.html",
      templateUrl: "tpl/angular-settings.html",
      controller: "PageController",
      data: {
        pageTitle: 'Angular Settings',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Angular Settings',
            href: '#/angular-settings.html'
          }]
      }
    })
  
    .state('/register', {
      url: "/register.html",
      templateUrl: "tpl/register.html",
      controller: "RegisterController",
      data: {
        pageTitle: 'Registration',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Registration',
            href: '#/register.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })
  
    .state('/transaction', {
      url: "/transaction.html",
      templateUrl: "tpl/transaction.html",
      controller: "TransactionController",
      data: {
        pageTitle: 'Transaction',
        crumbs: [{
            title: '<i class="fa fa-home"></i> Home',
            href: '#'
          }, {
            title: 'Transaction',
            href: '#/transaction.html'
          }]
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([{
            name: 'conAngular',
            insertBefore: '#ngInsertBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: conAssets('simpleWeather,sortable')
          }, {
            name: 'conAngular',
            serie: true, // used for synchronous load chart scripts
            insertBefore: '#ngInsertBefore',
            files: conAssets('dataTables,sparkline,flot,rickshaw,jvectormap')
          }]);
        }]
      }
    })


}]);

/* Init global settings and run the app */
conAngular.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.url = sessionStorage.url;
  
}]);