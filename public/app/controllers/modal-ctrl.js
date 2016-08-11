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

  // Item being lent
  // item.query(function success(data) {
  //   $scope.itemToLend = data;
  //   console.log("itemToLend", $scope.itemToLend.id);
  // })

  // LEND ITEM //
  console.log("item.id", item.id);
  $scope.lendItemState = {
    item_id: item.id,
    borrowerID: ''
  };

  $scope.lendItem = function() {
    // update borrow status of item
    console.log("Lending..", $scope.lendItemState);
    // $http.put('/api/lend-options/', )
  };


  // OPEN & CLOSE BUTTONS //
  $scope.ok = function(){
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

}]); // END modal instance Ctrl