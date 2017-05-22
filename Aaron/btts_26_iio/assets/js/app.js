var myApp = angular.module("myApp", ['ui.router']);
        myApp.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when("", "/pa");
            $stateProvider
        .state("pa", {
            url: "/pa",
            templateUrl: "pa.html"
        })
        .state("pa.p1", {
            url:"/p1",
            templateUrl: "p1.html"
        })
        .state("pa.p2", {
            url:"/p2",
            templateUrl: "p2.html"
        })
        .state("pa.p3", {
            url:"/p3",
            templateUrl: "p3.html"
        });
});