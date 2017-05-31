var myApp = angular.module("myApp", ['ui.router', 'ui.bootstrap', 'smart-table']);
    // UI-Router
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
    });
    // Slide Show
    myApp.controller('CarouselDemoCtrl', function ($scope) {
       $scope.myInterval = 5000;
       var slides = $scope.slides = [];
           slides.push(
               {image: 'assets/img/1.jpg'},
               {image: 'assets/img/2.jpg'},
               {image: 'assets/img/3.jpg'}
               );
    });



    // angular.module('common', []).filter('unique', function () {  
    //     return function (collection, keyname) {  
    //         console.info(collection);  
    //         console.info(keyname);  
    //         var output = [],  
    //             keys = [];  
    //         angular.forEach(collection, function (item) {  
    //             var key = item[keyname];  
    //             if (keys.indexOf(key) === -1) {  
    //                 keys.push(key);  
    //                 output.push(item);  
    //             }  
    //         });  
    //         return output;  
    //     }  
    // });  

    myApp.controller('basicsCtrl', ['$scope', function ($scope) {
        $scope.rowCollection = [
            {host_name: 'FTVP_CI_Slv', ip_address: '10.224.110.123', op_system: 'Windows 10 x64 Ent', owner:'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client1', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Peggy', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client2', ip_address: '10.224.110.125', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client3', ip_address: '10.224.110.126', op_system: 'Windows 10 x86 Pro', owner: 'Aaron', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client4', ip_address: '10.224.110.127', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client5', ip_address: '10.224.110.128', op_system: 'Windows 10 x86 Pro', owner: 'Joy', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client6', ip_address: '10.224.110.129', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client7', ip_address: '10.224.110.130', op_system: 'Windows 10 x86 Pro', owner: 'Mingxia Zhang', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client8', ip_address: '10.224.110.131', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client9', ip_address: '10.224.110.132', op_system: 'Windows 2012 x64 Ent', owner: 'Aaron', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'}
        ];
        
        // Add Owner List
        var owner_list=[];
        for (var i = 0; i < $scope.rowCollection.length; i++){
            owner_list[i] = $scope.rowCollection[i].owner;
        }

        function unique(arr) {
            var result = [], hash = {};
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
        $scope.defaultuser = 'Star';

        // Remove Row
        $scope.removeRow = function removeRow(row) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        };
        $scope.itemsByPage = 5;
    }]);

    myApp.directive('stRatio',function(){
        return {
            link:function(scope, element, attr){
                var ratio=+(attr.stRatio);

                element.css('width',ratio+'%');

            }
        };
    });