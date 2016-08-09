var BorrowApp = angular.module('BorrowApp', ['ui.router']);

BorrowApp.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl'
    })
  }]) // end config

BorrowApp.controller('MainCtrl', ['$scope', function($scope) {
  $scope.borrow = "BegBorrowNeverSteal";
}])