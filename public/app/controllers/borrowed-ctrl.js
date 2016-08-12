//// BORROWED CTRL ////

BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  // Switch image and view
  $scope.toggle = function(item) {
    if (item.show) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    for (var i = 0; i < data.length; i++) {
      data[i].show = true;
    }    
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl
