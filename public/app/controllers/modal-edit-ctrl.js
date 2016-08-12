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
    // Send form with newItem info to backend
    $http.put('/api/edit-stuff/', $scope.item)
    .then(function success(res) {
      $state.go('stuff.lend');
    }, function error(err){
      alert("Error: Item was not created");
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