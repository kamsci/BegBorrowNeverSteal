//// SEARCH CTRL ////

BorrowApp.controller('SearchCtrl', 
  ['$scope', '$http', 'selectUser',
  function($scope, $http, selectUser) {

  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
      // console.log('Data1', data);
      $scope.items = data;
    });

  $scope.showImage = true;
  // Switch image and view
  $scope.toggle = function() {
    if ($scope.showImage) {
      $scope.showImage = false;
    } else {
      $scope.showImage = true;
    }
  }

}]); // END SearchCtrl