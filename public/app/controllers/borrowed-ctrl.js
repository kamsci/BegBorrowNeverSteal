//// BORROWED CTRL ////

BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl
