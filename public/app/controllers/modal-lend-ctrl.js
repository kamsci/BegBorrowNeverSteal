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