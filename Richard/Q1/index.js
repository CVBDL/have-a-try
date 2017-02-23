/*
 * @Author: Peisong
 * @Date:   2017-02-23 16:48:35
 * @Last Modified by:   Peisong
 * @Last Modified time: 2017-02-23 16:49:57
 */

'use strict';
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    //	$scope.infos = [];
    $scope.GetRepo = () => {
        var myrequest = new XMLHttpRequest();
        myrequest.responseType = "json";
        myrequest.onreadystatechange = () => {
            if (myrequest.readyState == 4 && myrequest.status == 200) {
                $scope.infos = myrequest.response.items.slice(0, 10);
                $scope.test = "old";
                $scope.$apply();
                console.log("getSuccessful")
            }
        }
        myrequest.open("GET", "https://api.github.com/search/repositories?q=javascript", true);
        myrequest.send();
    }
});
