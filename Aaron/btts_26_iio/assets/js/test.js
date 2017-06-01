var myApp = angular.module("myApp", ['ui.router', 'ui.bootstrap', 'smart-table']);
// UI-Router
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/dash");

    $stateProvider.state("dash", {
        url: "/dash",
        templateUrl: "dash.html"
    }).state("dash.pc", {
        url: "/pc",
        templateUrl: "pc.html"
    }).state("dash.mobile", {
        url: "/mobile",
        templateUrl: "mobile.html"
    }).state("dash.vm", {
        url: "/vm",
        templateUrl: "vm.html"
    }).state("dash.mac", {
        url: "/mac",
        templateUrl: "mac.html"
    });
});
// Slide Show
myApp.controller('CarouselDemoCtrl', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push({
        image: 'assets/img/1.jpg'
    }, {
        image: 'assets/img/2.jpg'
    }, {
        image: 'assets/img/3.jpg'
    });
});

myApp.controller('basicsCtrl', function($scope, $http) {
    var url = "assets/data/vm.json";
    //$scope.rowCollection = []
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
    ;

    $scope.itemsByPage = 5;

    $http.get(url).success(function(response) {
        
        $scope.rowCollection = response;
        $scope.abc = url;
        console.log(11, $scope.rowCollection);

        // Add Owner List
        var owner_list = [];
        for (var i = 0; i < $scope.rowCollection.length; i++) {
            owner_list[i] = $scope.rowCollection[i].owner;
        }

        function unique(arr) {
            var result = []
              , hash = {};
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        }
        var arr = unique(owner_list);
        $scope.activities = arr;
    });

});

myApp.directive('stRatio', function() {
    return {
        link: function(scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});
