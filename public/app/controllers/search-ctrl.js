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

}]); // END SearchCtrl