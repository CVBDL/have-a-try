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

    myApp.controller('basicsCtrl', ['$scope', function ($scope) {
        $scope.rowCollection = [
            {host_name: 'FTVP_CI_Slv', ip_address: '10.224.110.123', op_system: 'Windows 10 x64 Ent', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.124', op_system: 'Windows 10 x86 Pro', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'},
            {host_name: 'FTVP_CI_Client', ip_address: '10.224.110.125', op_system: 'Windows 2012 x64 Ent', owner: 'Star', email: 'ssun@ra.rockwell.com', production: 'FTView + FTVP 10.0 bld 123', notes: 'For CI testing'}
        ];
        $scope.removeRow = function removeRow(row) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        };
        $scope.itemsByPage = 5;
    }]);
    //
    // myApp.controller('basicsCtrl', ['$scope', function ($scope) {
    //
    //     var
    //         nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
    //         familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    //
    //     function createRandomItem() {
    //         var
    //             firstName = nameList[Math.floor(Math.random() * 4)],
    //             lastName = familyName[Math.floor(Math.random() * 4)],
    //             age = Math.floor(Math.random() * 100),
    //             email = firstName + lastName + '@whatever.com',
    //             balance = Math.random() * 3000;
    //
    //         return{
    //             firstName: firstName,
    //             lastName: lastName,
    //             age: age,
    //             email: email,
    //             balance: balance
    //         };
    //     }
    //
    //
    //     $scope.displayed = [];
    //     for (var j = 0; j < 50; j++) {
    //         $scope.displayed.push(createRandomItem());
    //     }
    // }])
        myApp.directive('stRatio',function(){
            return {
                link:function(scope, element, attr){
                    var ratio=+(attr.stRatio);

                    element.css('width',ratio+'%');

                }
            };
        });

