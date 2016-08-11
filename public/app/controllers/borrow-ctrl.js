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