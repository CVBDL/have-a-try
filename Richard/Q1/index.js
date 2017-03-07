/*
 * @Author: Peisong
 * @Date:   2017-02-23 16:48:35
 * @Last Modified by:   Peisong
 * @Last Modified time: 2017-03-02 16:56:52
 */

'use strict';
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.infos = [];
    $scope.num = 10;
    $scope.isLoadingShow = false;
    $scope.GetRepo = () => {
        $http.get("https://api.github.com/search/repositories?q=javascript").success((data) => {
            $scope.isLoadingShow = true;
            $scope.infos = data.items;
        });
    }



    $scope.GetRepo();
});

function resize() {
    if (document.body.clientWidth >= 768) {
        document.getElementById("csslink").href = "index2.css";
    } else {
        document.getElementById("csslink").href = "index1.css";
    }
};
