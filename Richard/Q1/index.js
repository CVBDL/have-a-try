/*
 * @Author: Peisong
 * @Date:   2017-02-23 16:48:35
 * @Last Modified by:   Peisong
 * @Last Modified time: 2017-03-08 16:34:24
 */

'use strict';
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.searchContent = "";
    $scope.isWarningShow = false;
    $scope.infos = [];
    $scope.num = 10;
    $scope.isLoadingShow = false;

    $scope.GetRepo = () => {
        if ($scope.searchContent != "") {
            $scope.isWarningShow = false;

            $scope.isLoadingShow = true;
            var myUrl = "https://api.github.com/search/repositories?q=" + $scope.searchContent;
            $http.get(myUrl)
                .success((data) => {
                    $scope.isLoadingShow = false;
                    $scope.infos = data.items;
                })
                .error(() => {
                    $scope.isLoadingShow = false;
                });
        } else {
            $scope.isWarningShow = true;
            $scope.isLoadingShow = true;
        }
    }
});

function resize() {
    if (document.body.clientWidth >= 768) {
        document.getElementById("csslink").href = "index2.css";
    } else {
        document.getElementById("csslink").href = "index1.css";
    }
};
