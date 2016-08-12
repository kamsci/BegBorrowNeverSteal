//// SEARCH CTRL ////

BorrowApp.controller('BorrowCtrl', 
  ['$scope', '$http', 'selectUser',
  function($scope, $http, selectUser) {

  // GET USER SELECTED
  var id = selectUser.getId();
  // $http call to backend route that queries db
  $http.get('/api/borrow-stuff/' + id).success(function(data, status) {
      for (var i = 0; i < data.length; i++) {
        data[i].show = true;
      }
      $scope.items = data; 
    });

  // Switch image and view
  $scope.toggle = function(item) {
    if (item.show) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

}]); // END SearchCtrl