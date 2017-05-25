var myApp = angular.module("myApp", ['ui.router', 'ui.bootstrap']);
        myApp.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when("", "/dash");
            $stateProvider
        .state("dash", {
            url: "/dash",
            templateUrl: "dash.html"
        })
        .state("dash.pc", {
            url:"/pc",
            templateUrl: "pc.html"
        })
        .state("dash.mobile", {
            url:"/mobile",
            templateUrl: "mobile.html"
        })
        .state("dash.vm", {
            url:"/vm",
            templateUrl: "vm.html"
        })
        .state("dash.mac", {
            url:"/mac",
            templateUrl: "mac.html"
        });
        
        // angular.module('app', ['ui.bootstrap']);
        // function CarouselDemoCtrl($scope){
        //   $scope.myInterval = 3000;
        //   $scope.slides = [
        //     {
        //       image: './assets/img/1.jpg'
        //     },
        //     {
        //       image: 'assets/img/1.jpg'
        //     },
        //     {
        //       image: 'assets/img/1.jpg'
        //     },
        //     {
        //       image: 'assets/img/1.jpg'
        //     }
        //   ];
        // }

        myApp.controller('CarouselDemoCtrl', function($scope){
            $scope.myInterval = 3000;
            var slides = $scope.slides = [];
            slides.push({image:'./assets/img/1.jpg'});
            slides.push({image:'./assets/img/2.jpg'});
        });

      //   myApp.controller('CarouselDemoCtrl', function ($scope) {
      //     $scope.myInterval = 5000;
      //     $scope.noWrapSlides = false;
      //     $scope.active = 0;
      //     var slides = $scope.slides = [];
      //     slides.push({image:'./assets/img/1.jpg'});
      //     slides.push({image:'./assets/img/2.jpg'});
      //     var currIndex = 0;
      // });
});
