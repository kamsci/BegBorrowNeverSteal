var BorrowApp = angular.module('BorrowApp', ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap']);

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
      url: 'stuff/search',
      templateUrl: 'app/views/borrow.html'
    })
    .state('stuff.lend', {
      url: 'stuff/lend',
      templateUrl: 'app/views/lend.html',
    })
    .state('stuff.borrowed', {
      url: 'stuff/borrowed',
      templateUrl: 'app/views/borrowed.html'
    })

  }]); // END config

/////////////////////////
//     CONTROLLERS    //
///////////////////////

// MAIN CTRL
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
    // console.log("state", $state);
    selectUser.setId(id);
    $state.go('stuff.search');
  };
}]); // END MainCtrl

// BORROW CTRL
BorrowApp.controller('BorrowCtrl', 
  ['$scope', '$http', '$state', '$uibModal', '$log', 'selectUser', 
  function($scope, $http, $state, $uibModal, $log, selectUser) {
  
  $scope.navTitle = "Stuff to Borrow";

  // NAVIGATE
  $scope.home = function() {
    $state.go('main');
  }

  $scope.titleChange = function(){
    if ($state.is('stuff.search')) {
      $scope.navTitle = "Stuff to Borrow"; 
    } else if ($state.is('stuff.borrowed')) {
      $scope.navTitle = "Stuff I Borrowed"; 
    } else if ($state.is('stuff.lend')) {
      $scope.navTitle = "Stuff I Lend"; 
    }   
  }

  $scope.prevState = function(){
      console.log($state);
    if ($state.is('stuff.search')) {
      $state.go('stuff.borrowed');
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.lend')
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.search');
    }
    $scope.titleChange();
  }
  $scope.nextState = function(){
      console.log($state, "HERE");
    if ($state.is('stuff.search')) {
      $state.go('stuff.lend');
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.borrowed')
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.search');
    }
    $scope.titleChange();
  }

  // NEW ITEM MODAL
  $scope.animationsEnabled = true;

  $scope.open = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newItemModal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {}
    });
  }



  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
      // console.log('Data', data);
      $scope.things = data;
    })
  // Items.query(function success(data) {
  //   $scope.items = data;
  // });

  // GET USER LEND
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    console.log("myThings", data);
    $scope.myThings = data;
  })
}]); // END BorrowCtrl


// MODAL INSTANCE CTRL

BorrowApp.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  $scope.ok = function(){
    $uibModalInstance.close();
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]); // END modal instance Ctrl

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