// Code goes here
(function(){

var app = angular.module("githubViewer", []);

var MainController = function($scope, $http) {

  var onRequestComplete = function(response) {

    $scope.repos = response.data;
    $scope.count = 10;
  }

  $http.get("https://api.github.com/search/repositories?q=javascript")
       .then(onRequestComplete);


}

app.controller("MainController", MainController);

}());