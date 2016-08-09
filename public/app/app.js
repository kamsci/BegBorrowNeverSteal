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
      url: '/borrow-stuff',
      templateUrl: 'app/views/borrow.html',
      controller: 'BorrowCtrl'
    })

  }]) // end config


// CONTROLLERS

BorrowApp.controller('MainCtrl', ['$scope', 'Users', function($scope, Users) {
  $scope.borrow = "BegBorrowNeverSteal";
  // fad in and out pills
  $scope.bool = true;
  console.log("StartBool", $scope.bool);
  // include User from resource factory in array
  // query express Users for users
  Users.query(function success(data) {
    $scope.allUsers = data;
  }, function error(error) {
    console.log("Error allUsers", error);
  });
  // function for sending user selection to borrow page
  $scope.userSelect = function(id){
    // select all products where userId != id
    
  };
}]); // end MainCtrl

BorrowApp.controller('BorrowCtrl', ['$scope', function($scope) {
  $scope.borrowStuff = " Stuff to Borrow";
    // add search for users
  $scope.allUsers = ['Amy', 'Jon', 'Travis', 'Eric'];
}]); // end BorrowCtrl


// FACTORIES
BorrowApp.factory('Users', ['$resource', function($resource) {
  return $resource('/api/borrow-stuff');
}])