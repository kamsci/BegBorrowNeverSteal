////// NAV CTRL //////

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