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
    $scope.titleChange(state);
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
  $scope.animationsEnabled = false;

  $scope.open = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/newItemModal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {}
    });
  };

}]); // END BorrowCtrl
//// BORROWED CTRL ////

BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl

//// LEND CTRL ////

BorrowApp.controller('LendCtrl', 
  ['$scope','$http', '$uibModal', '$log', '$sce', 'selectUser', 
  function($scope, $http, $uibModal, $log, $sce, selectUser) {

  var id = selectUser.getId();
  $scope.trustAsHtml = $sce.trustAsHtml

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

  // GET USER LEND STUFF
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    // console.log("myItems", data);
    $scope.myItems = data;
  });

  // LEND ITEM MODAL
  $scope.animationsEnabled = false;

  $scope.open = function(item) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/editLendModal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        item: item
      }
    });
  };

  // RETURN ITEM
  $scope.returnItem = function(id) {
    console.log("ID", id);
    $http.put('/api/return-stuff/' + id)
    .then(function(data) {
      $scope.myItems
    })
  }

}]); // END LendCtrl
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
//// MODAL INSTANCE CTRL ////

BorrowApp.controller('ModalInstanceCtrl', [
  '$scope', '$http', '$uibModalInstance', 'Users', 'selectUser', 'item',
  function($scope, $http, $uibModalInstance, Users, selectUser, item) {
  
  var id = selectUser.getId();

  // NEW ITEM //
  $scope.newItem = {
    user_id: id,
    name: '',
    category: '',
    description: '',
    imageUrl: ''
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

  // Users to lend to
  Users.query(function success(data) {
    $scope.usersToLend = data;
  }, function error(error) {
    console.log("Error usersToLend", error);
  });


  // LEND ITEM //
  console.log("item.id", item.id);

  $scope.lendItemUpdate = {
    // item.id comes from open() resolve option
    item_id: item.id,
    borrowerID: null
  };

  $scope.lendItem = function() {
    // update borrow status of item
    console.log("Lending..", $scope.lendItemUpdate);
    $http.put('/api/lend-stuff/', $scope.lendItemUpdate)
    .then(function(data) {
      console.log("Item Lent");
    }, function(err) {
      console.log("Lend Item Error", err);
    });
  };


  // OPEN & CLOSE BUTTONS //
  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]); // END modal instance Ctrl
//// SEARCH CTRL ////

BorrowApp.controller('SearchCtrl', 
  ['$scope', '$http', 'selectUser',
  function($scope, $http, selectUser) {

  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
      // console.log('Data1', data);
      $scope.items = data;
    });

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

}]); // END SearchCtrl

//# sourceMappingURL=concat.js.map
