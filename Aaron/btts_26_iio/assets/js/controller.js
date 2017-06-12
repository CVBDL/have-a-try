/**
 * Created by jywl on 2016/7/7.
 */
angular.module('demoForNotify.controller', [])
    .controller("parentCtr",
        function ($scope) {
            $scope.$on("Ctr1NameChange",
                function (event, msg) {
                    console.log("parent msg", msg);
                    $scope.$broadcast("Ctr1NameChangeFromParrent", msg);
                });
        })
    .controller("childCtr1", function ($scope) {
        $scope.change = function (name) {
            console.log("childCtr1", name);
            $scope.$emit("Ctr1NameChange", name);
        };
    })
    .controller("childCtr2", function ($scope) {
        $scope.$on("Ctr1NameChangeFromParrent",
            function (event, msg) {
                console.log("childCtr2", msg);
                $scope.child2Name = msg;
            });
    })
    .controller("parentBrotherCtr",
        function ($scope) {
            $scope.$on("Ctr1NameChange",
                function (event, msg) {
                    console.log("parent msg", msg);
                    $scope.$broadcast("Ctr1NameChangeFromParrent", msg);
                });
        })
    .controller("brotherChildCtr1", function ($scope) {
        $scope.change = function (name) {
            console.log("childCtr1", name);
            $scope.$emit("Ctr1NameChange", name);
        };
    })
    .controller("brotherChildCtr2", function ($scope) {
        $scope.$on("Ctr1NameChangeFromParrent",
            function (event, msg) {
                console.log("childCtr2", msg);
                $scope.brotherName2 = msg;
            });
    })