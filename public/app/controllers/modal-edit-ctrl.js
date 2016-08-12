//// MODAL EDIT CTRL ////

BorrowApp.controller('ModalEditCtrl', [
  '$scope', '$http', '$uibModalInstance', '$state', 'Users', 'selectUser',
  function($scope, $http, $uibModalInstance, $state, Users, selectUser) {
  
  var id = selectUser.getId();
  var itemId = null;

  // $scope.editableItem = {
  //   user_id: id,
  //   name: '',
  //   category: '',
  //   description: '',
  //   imageUrl: ''
  // };

  // EDIT ITEM //
  $scope.editRequest = function(id) {
    console.long("in edit");
    $scope.itemId = id;
    $http.get('api/get-edit' + id)
    .then(function(res) {
      console.log("EDIT", res);
      $scope.editableItem = {
        user_id: id,
        name: res.name,
        category: res.category,
        description: res.description,
        imageUrl: res.imageUrl
      };
    });  
  }

  $scope.editItem = function(editableItem){
    // Send form with newItem info to backend
    $http.put('/api/edit-stuff/' + $scope.itemId, $scope.editableItem)
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