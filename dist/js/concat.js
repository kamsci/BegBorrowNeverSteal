var BorrowApp=angular.module("BorrowApp",["ngAnimate","ui.router"]);BorrowApp.config(["$stateProvider","$urlRouterProvider",function(r,o){o.otherwise("/"),r.state("main",{url:"/",templateUrl:"app/views/main.html",controller:"MainCtrl"}).state("stuff",{url:"/borrow-stuff",templateUrl:"app/views/borrow.html",controller:"BorrowCtrl"})}]),BorrowApp.controller("MainCtrl",["$scope",function(r){r.borrow="BegBorrowNeverSteal",r.bool=!0,console.log("StartBool",r.bool),r.allUsers=["Amy","Jon","Travis"],r.userSelect=function(r){}}]),BorrowApp.controller("BorrowCtrl",["$scope",function(r){r.borrowStuff=" Stuff to Borrow testing",r.allUsers=["Amy","Jon","Travis","Eric"]}]);
//# sourceMappingURL=concat.js.map
