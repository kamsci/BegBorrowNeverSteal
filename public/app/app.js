var BorrowApp = angular.module('BorrowApp', ['ngAnimate', 'ui.router']);

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

BorrowApp.controller('MainCtrl', ['$scope', function($scope) {
  $scope.borrow = "BegBorrowNeverSteal";
  // fad in and out pills
  $scope.bool = true;
  console.log("StartBool", $scope.bool);
  // add search for users
  $scope.allUsers = ['Amy', 'Jon', 'Travis'];
  // function for sending user selection to borrow page
  $scope.userSelect = function(id){

  };
}]); // end MainCtrl

BorrowApp.controller('BorrowCtrl', ['$scope', function($scope) {
  $scope.borrowStuff = " Stuff to Borrow";
}]); // end BorrowCtrl