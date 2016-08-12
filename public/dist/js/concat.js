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
//// SEARCH CTRL ////

BorrowApp.controller('BorrowCtrl', 
  ['$scope', '$http', 'selectUser',
  function($scope, $http, selectUser) {

  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
    console.log("ID", id)
      for (var i = 0; i < data.length; i++) {
        data[i].show = true;
      }
      $scope.items = data; 
    });

  // Switch image and view
  $scope.toggle = function(item) {
    if (item.show) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

}]); // END SearchCtrl
//// BORROWED CTRL ////

BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  // Switch image and view
  $scope.toggle = function(item) {
    if (item.show) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    for (var i = 0; i < data.length; i++) {
      data[i].show = true;
    }    
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl

//// LEND CTRL ////

BorrowApp.controller('LendCtrl', 
  ['$scope','$http', '$uibModal', '$log', '$sce', 'selectUser', 
  function($scope, $http, $uibModal, $log, $sce, selectUser) {

  var id = selectUser.getId();
  $scope.trustAsHtml = $sce.trustAsHtml

  $scope.animationsEnabled = false;

  // Switch image and view
  $scope.toggle = function(item) {
    if (item.show) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

  // EDIT ITEM Modal
  $scope.openEdit = function(item) {
    console.log("open edit")
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/editItemModal.html',
      controller: 'ModalEditCtrl',
      resolve: {
        item: item
      }
    });
  };

  // GET USER LEND STUFF
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    // console.log("myItems", data);
    for (var i = 0; i < data.length; i++) {
      data[i].show = true;
    }
    $scope.myItems = data;
  });

  // LEND ITEM MODAL
  $scope.open = function(item) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/editLendModal.html',
      controller: 'ModalLendCtrl',
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
    $state.go('stuff.borrow');
  };
  
}]); // END MainCtrl
//// MODAL EDIT CTRL ////

BorrowApp.controller('ModalEditCtrl', [
  '$scope', '$http', '$uibModalInstance', '$state', 'Users', 'item', 'selectUser',
  function($scope, $http, $uibModalInstance, $state, Users, item, selectUser) {
  
  var id = selectUser.getId();
  $scope.item = item;

  // $scope.item = {
  //   name: item.name,
  //   category: item.category,
  //   description: item.description,
  //   imageUrl: item.imageUrl 
  // }

  $scope.editItem = function(){
    // Send form with item info to backend
    $http.put('/api/edit-stuff/', $scope.item)
    .then(function success(res) {
      $state.go('stuff.lend');
    }, function error(err){
      console.log("Edit Error", err);
    });    
  }

  $scope.deleteItem = function() {
    // Send form with item info to backend
    $http.put('/api/delete-stuff/', $scope.item)
    .then(function success(res) {
      // $state.go('stuff.lend');
    }, function error(err){
      console.log("Delete Error", err);
    }); 

    $uibModalInstance.close();
  }

  // OPEN & CLOSE BUTTONS //
  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]); // END modal new Ctrl
//// MODAL NEW CTRL ////

BorrowApp.controller('ModalLendCtrl', [
  '$scope', '$http', '$uibModalInstance', '$state', 'Users', 'selectUser', 'item',
  function($scope, $http, $uibModalInstance, $state, Users, selectUser, item) {

  // Users to lend to
  Users.query(function success(data) {
    $scope.usersToLend = data;
  }, function error(error) {
    console.log("Error usersToLend", error);
  });


  // LEND ITEM //
  $scope.lendItemUpdate = {
    // item.id comes from open() resolve option
    item_id: item.id,
    borrowerID: null
  };

  $scope.lendItem = function() {
    // update borrow status of item
    $http.put('/api/lend-stuff/', $scope.lendItemUpdate)
    .then(function(data) {
      $state.go('stuff.lend');
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
//// MODAL NEW CTRL ////

BorrowApp.controller('ModalNewCtrl', [
  '$scope', '$http', '$uibModalInstance', '$state', 'Users', 'selectUser',
  function($scope, $http, $uibModalInstance, $state, Users, selectUser) {
  
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
      console.log("Created");
      $state.go('stuff.lend');
    }, function error(err){
      console.log("Post Error", err);
    });    
  }


  // OPEN & CLOSE BUTTONS //
  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]); // END modal new Ctrl
////// BORROW CTRL //////

BorrowApp.controller('NavCtrl', 
  ['$scope', '$http', '$state', '$uibModal', '$log', 'selectUser', 
  function($scope, $http, $state, $uibModal, $log, selectUser) {

  // NAVIGATE
  $scope.navTitle = "Stuff to Borrow";

  $scope.home = function() {
    $state.go('main');
  };

  $scope.titleChange = function(state){
    if (state === 'borrow') {
      $scope.navTitle = "Stuff to Borrow"; 
    } else if (state === 'borrowed') {
      $scope.navTitle = "Stuff I Borrowed"; 
    } else if (state === 'lend') {
      $scope.navTitle = "Stuff I Lend"; 
    };   
  };

  $scope.prevState = function(){
      // console.log($state);
    if ($state.is('stuff.borrow')) {
      $state.go('stuff.borrowed');
      var state = 'borrowed';
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.lend')
      var state = 'lend';
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.borrow');
      var state = 'borrow';
    };
    $scope.titleChange(state);
  };
  $scope.nextState = function(){
      // console.log($state, "HERE");
    if ($state.is('stuff.borrow')) {
      $state.go('stuff.lend');
      var state = 'lend';
    } else if ($state.is('stuff.lend')) {
      $state.go('stuff.borrowed')
      var state = 'borrowed';
    } else if ($state.is('stuff.borrowed')) {
      $state.go('stuff.borrow');
      var state = 'borrow';
    };
    $scope.titleChange(state);
  };

  // NEW ITEM MODAL
  $scope.animationsEnabled = false;

  $scope.open = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/newItemModal.html',
      controller: 'ModalNewCtrl',
      resolve: {}
    });
  };

}]); // END BorrowCtrl

//# sourceMappingURL=concat.js.map
