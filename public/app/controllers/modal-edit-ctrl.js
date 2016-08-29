//// MODAL EDIT CTRL ////

BorrowApp.controller('ModalEditCtrl', [
  '$scope', '$http', '$uibModalInstance', '$state', 'Users', 'item', 'selectUser',
  function($scope, $http, $uibModalInstance, $state, Users, item, selectUser) {
  
  var id = selectUser.getId();
  $scope.item = item;


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