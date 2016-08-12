var BorrowApp = angular.module('BorrowApp', ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap']);

// UI.ROUTER //
BorrowApp.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl'
    })
    .state('stuff', {
      url: '/',
      templateUrl: 'app/views/nav.html',
      controller: 'NavCtrl'
    })
    .state('stuff.borrow', {
      url: 'stuff/borrow',
      templateUrl: 'app/views/borrow.html',
      controller: 'BorrowCtrl'
    })
    .state('stuff.lend', {
      url: 'stuff/lend',
      templateUrl: 'app/views/lend.html',
      controller: 'LendCtrl'
    })
    .state('stuff.borrowed', {
      url: 'stuff/borrowed',
      templateUrl: 'app/views/borrowed.html',
      controller: 'BorrowedCtrl'
    })

  }]); // END config

/////////////////////////////////
//     Factories & Services   //
///////////////////////////////

// FACTORIES

// Gets list of all users and sends to MAIN CTRL
BorrowApp.factory('Users', ['$resource', function($resource) {
  return $resource('/api/users');
}]); // END Users factory

// // Refactored - now used $http to call exress instead
// BorrowApp.factory('Items', ['$resource', function($resource) {
//   return $resource('/api/borrow-stuff');
// }]);

// SERVICES

// Sets and gets Id for user selected on main.html
BorrowApp.service('selectUser', [function() {
  this.setId = function(id) {
    this.id = id;
  }
  this.getId = function(){
    return this.id;
  }
}]); // END selectUser service