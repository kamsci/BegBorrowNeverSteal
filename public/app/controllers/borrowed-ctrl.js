//// BORROWED CTRL ////

BorrowApp.controller('BorrowedCtrl', 
  ['$scope', '$http', 'selectUser', 
  function($scope, $http, selectUser) {

  var id = selectUser.getId();

  $http.get('/api/borrowed-stuff/' + id).success(function(data, status) {
    $scope.myBorrowedItems = data;
  });

}]); // END BorrowedCtrl
