//// LEND CTRL ////

BorrowApp.controller('LendCtrl', 
  ['$scope','$http', '$uibModal', '$log', '$sce', 'selectUser', 
  function($scope, $http, $uibModal, $log, $sce, selectUser) {

  var id = selectUser.getId();
  $scope.trustAsHtml = $sce.trustAsHtml

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

  // GET USER LEND STUFF
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    // console.log("myItems", data);
    $scope.myItems = data;
  });

  // LEND ITEM MODAL
  $scope.animationsEnabled = false;

  $scope.open = function(item) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/editLendModal.html',
      controller: 'ModalInstanceCtrl',
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