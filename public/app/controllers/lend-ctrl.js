//// LEND CTRL ////

BorrowApp.controller('LendCtrl', 
  ['$scope','$http', '$uibModal', '$log', 'selectUser', 
  function($scope, $http, $uibModal, $log, selectUser) {

  var id = selectUser.getId();

  // GET USER LEND STUFF
  $http.get('/api/lend-stuff/' + id).success(function(data, status) {
    // console.log("myItems", data);
    $scope.myItems = data;
  });

  // EDIT LEND STATUS MODAL
  // $scope.animationsEnabled = true;

  $scope.open = function(item) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/templates/editLendModal.html',
      controller: 'ModalInstanceCtrl',
      //size: size,
      resolve: {
        item: item
      }
    });
  };

}]); // END LendCtrl