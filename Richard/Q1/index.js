/*
 * @Author: Peisong
 * @Date:   2017-02-23 16:48:35
 * @Last Modified by:   Peisong
 * @Last Modified time: 2017-02-28 14:25:37
 */

'use strict';
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.infos = [];
    $scope.num = 10;
    $scope.isLoadingShow=false;
    $scope.GetRepo = () => {
        $http.get("https://api.github.com/search/repositories?q=javascript").success((data) => {
            $scope.isLoadingShow=true;
            $scope.infos = data.items;
        });
    }
    $scope.GetRepo();
});
