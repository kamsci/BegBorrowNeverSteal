//// MAIN CTRL ////

BorrowApp.controller('MainCtrl', ['$scope', 'Users', 'selectUser', '$state', function($scope, Users, selectUser, $state) {
  $scope.borrow = "BegBorrowNeverSteal";
  // fad in and out pills
  $scope.bool = true;
  // include User from resource factory in array
  // query express Users for users
  Users.query(function success(data) {
    $scope.allUsers = data;
  }, function error(error) {
    console.log("Error allUsers", error);
  });

  // function for sending user selection to borrow page
  $scope.select = function(id){
    // console.log("state", $state);
    selectUser.setId(id);
    $state.go('stuff.borrow');
  };
  
}]); // END MainCtrl