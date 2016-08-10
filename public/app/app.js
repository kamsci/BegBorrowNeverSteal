var BorrowApp = angular.module('BorrowApp', ['ngResource', 'ngAnimate', 'ui.router']);

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
      controller: 'BorrowCtrl'
    })
    .state('stuff.search', {
      url: '/search',
      templateUrl: 'app/views/borrow.html'
    })
    .state('stuff.lend', {
      url: '/lend',
      templateUrl: 'app/views/lend.html',
    })
    .state('stuff.borrowed', {
      url: '/borrowed',
      templateUrl: 'app/views/borrowed.html'
    })

  }]); // end config


// CONTROLLERS

BorrowApp.controller('MainCtrl', ['$scope', 'Users', 'selectUser', '$state', function($scope, Users, selectUser, $state) {
  $scope.borrow = "BegBorrowNeverSteal";
  // fad in and out pills
  $scope.bool = true;
  // include User from resource factory in array
  // query express Users for users
  Users.query(function success(data) {
    $scope.allUsers = data;
  }, function error(error) {
    console.log("Error allUsers", error);
  });

  // function for sending user selection to borrow page
  $scope.select = function(id){
    console.log("state", $state);
    selectUser.setId(id);
    $state.go('stuff.search');
  };
}]); // end MainCtrl

BorrowApp.controller('BorrowCtrl', ['$scope', '$http', '$state', 'selectUser', function($scope, $http, $state, selectUser) {
  $scope.borrowStuff = "Stuff to Borrow";
  // NAVIGATE
  $scope.prevState = function(){
      console.log($state);
    if ($state.is('stuff.search')) {
      $state.go('stuff.borrowed');
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.lend')
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.search');
    }
  }
  $scope.nextState = function(){
      console.log($state, "HERE");
    if ($state.is('stuff.search')) {
      $state.go('stuff.lend');
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.borrowed')
    } else if ($state.is('stuff.barrowed')) {
      $state.go('stuff.search');
    }
  }
  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get("/api/borrow-stuff/" + id).success(function(data, status) {
      console.log('Data', data);
      $scope.items = data;
    })
  // Items.query(function success(data) {
  //   $scope.items = data;
  // });
}]); // end BorrowCtrl


// FACTORIES
BorrowApp.factory('Users', ['$resource', function($resource) {
  return $resource('/api/users');
}]);

BorrowApp.factory('Items', ['$resource', function($resource) {
  return $resource('/api/borrow-stuff');
}]);

// SERVICES
BorrowApp.service('selectUser', [function() {
  this.setId = function(id) {
    this.id = id;
  }
  this.getId = function(){
    return this.id;
  }
}]);