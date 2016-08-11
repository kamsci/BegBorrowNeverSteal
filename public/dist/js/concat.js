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
      controller: 'BorrowCtrl'
    })
    .state('stuff.search', {
      url: 'stuff/search',
      templateUrl: 'app/views/borrow.html',
      controller: 'SearchCtrl'
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

/////////////////////////
//     CONTROLLERS    //
///////////////////////

//// MAIN CTRL ////
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


////// BORROW CTRL //////
BorrowApp.controller('BorrowCtrl', 
  ['$scope', '$http', '$state', '$uibModal', '$log', 'selectUser', 
  function($scope, $http, $state, $uibModal, $log, selectUser) {

  // NAVIGATE
  $scope.navTitle = "Stuff to Borrow";

  $scope.home = function() {
    $state.go('main');
  };

  $scope.titleChange = function(state){
    if (state === 'search') {
      $scope.navTitle = "Stuff to Borrow"; 
    } else if (state === 'borrowed') {
      $scope.navTitle = "Stuff I Borrowed"; 
    } else if (state === 'lend') {
      $scope.navTitle = "Stuff I Lend"; 
    };   
  };

  $scope.prevState = function(){
      // console.log($state);
    if ($state.is('stuff.search')) {
      $state.go('stuff.borrowed');
      var state = 'borrowed';
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.lend')
      var state = 'lend';
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.search');
      var state = 'search';
    };
    $scope.titleChange();
  };
  $scope.nextState = function(){
      // console.log($state, "HERE");
    if ($state.is('stuff.search')) {
      $state.go('stuff.lend');
      var state = 'lend';
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.borrowed')
      var state = 'borrowed';
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.search');
      var state = 'search';
    };
    $scope.titleChange(state);
  };

  // NEW ITEM MODAL
  // $scope.animationsEnabled = true;

  $scope.open = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newItemModal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {}
    });
  };

  $scope.createItem = function(newItem){
    // Send form with newItem info to backend
    $http.post('/api/new-stuff/', $scope.newItem)
    .then(function success(res) {
      console.log("Post Success", res);
    }, function error(err){
      alert("Error: Item was not created");
      console.log("Post Error", err);
    });    
  }
}]); // END BorrowCtrl


//// SEARCH CTRL ////
BorrowApp.controller('SearchCtrl', 
  ['$scope', '$http', 'selectUser',
  function($scope, $http, selectUser) {

  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
      console.log('Data1', data);
      $scope.items = data;
    });

}]); // END SearchCtrl

  
//// LEND CTRL ////
BorrowApp.controller('LendCtrl', 
  ['$scope','$http', '$uibModal', '$log', 'selectUser', 
  function($scope, $http, $uibModal, $log, selectUser) {

  var id = selectUser.getId();

  // GET USER LEND
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    // console.log("myItems", data);
    $scope.myItems = data;
  });
  $scope.checkInOrOut = function(id, borrowed) {
    // console.log("id, borrowed", id, borrowed);
    //   $http.post('/api/edit-stuff/' + id, borrowed).then(function(data) {
    //     console.log("success Edit", data)
    //   }, function(err) {
    //     console.log("Error edit", err);
    //   }); 
  }

  // EDIT LEND STATUS MODAL

}]); // END LendCtrl


//// BORROWED CTRL ////
BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl


//// MODAL INSTANCE CTRL ////
BorrowApp.controller('ModalInstanceCtrl', ['$scope', '$http', '$uibModalInstance', 'selectUser', 
  function($scope, $http, $uibModalInstance, selectUser) {
  var id = selectUser.getId();

  $scope.newItem = {
    user_id: id,
    name: '',
    category: '',
    description: '',
    imageUrl: ''
  };

  $scope.borrowItemState = {
    item_id: '',
    borrowed: '',
    borrowerID: '',
    dateBorrowed: ''
  };

  $scope.editBorrow = function(borrowItemState) {
    // update borrow status of item
    $http.put('/api/edit-borrow/')
  }

  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]); // END modal instance Ctrl


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

//# sourceMappingURL=concat.js.map
