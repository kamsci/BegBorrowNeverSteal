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