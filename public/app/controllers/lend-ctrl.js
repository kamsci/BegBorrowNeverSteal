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
      resolve: {}
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