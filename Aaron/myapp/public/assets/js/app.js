var myApp = angular.module("myApp", ['ui.router', 'ui.bootstrap', 'smart-table']);

var vmlist = "";
var memlist = [];

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
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
        // $http.post('http://localhost:8282/vm_post', index).success(function(response){
          // $scope.row123 = response;
          // $scope.rowCollection = response;
          // $scope.totalVM = response.length;
          // console.log($scope.totalVM);
        // }).error(function(){
        //     alert("an unexpected error ocurred!");
        // });
    };

    $scope.itemsByPage = 5;

    $http.get('http://localhost:8282/vm_get').success(function(response){
      vmlist = response;
      $scope.row123 = response;
      $scope.rowCollection = response;
      //$scope.totalVM = response.length;
      console.log($scope.totalVM);
    }).error(function(){
        alert("an unexpected error ocurred!");
    });

    $http.get('http://localhost:8282/member_get').success(function(response){
      $scope.members = response;
      // Add Owner List
        var owner_list = [];
        for (var i = 0; i < $scope.members.length; i++) {
            owner_list[i] = $scope.members[i].text;
        }

        function unique(arr) {
            var result = []
              hash = {};
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
      }).error(function(){
         alert("an unexpected error ocurred!");
      });
     $scope.addVM = function(){
        var newVM = {
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    };

        $http.post('http://localhost:8282/vm_post', newVM).success(function(){
            $scope.msg = 'Data saved';
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });

        $http.get('http://localhost:8282/vm_get').success(function(response){
              $scope.totalVM = response.length;
              console.log($scope.totalVM);
            }).error(function(){
                alert("an unexpected error ocurred!");
            });
        $scope.row123.push({
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    });
        $scope.host_name = "";
        $scope.ip_address = "";
        $scope.op_system = "";
        $scope.owner = "";
        $scope.email = "";
        $scope.production = "";
        $scope.notes = "";
        $("#newDeviceDialog").modal('hide');
    }

    $scope.cancel = function(){
        var newVM = {
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    };

        $scope.host_name = "";
        $scope.ip_address = "";
        $scope.op_system = "";
        $scope.owner = "";
        $scope.email = "";
        $scope.production = "";
        $scope.notes = "";
    }
});

myApp.controller('memberControl', function($scope, $http) {
  
  $http.get('http://localhost:8282/member_get').success(function(response){

    $scope.members = response;

    }).error(function(){
       alert("an unexpected error ocurred!");
    });

  // $scope.members = [];
    $scope.addItem = function () {
      var newMem = {
                      text: $scope.member
                    };
      $http.post('http://localhost:8282/member_post', newMem).success(function(){
            $scope.msg = 'Data saved';
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });
      $scope.members.push({text:$scope.member});
      $scope.member = '';
    }
    $scope.delete = function (index, members) {
        members.splice(index, 1);
        console.log(JSON.stringify(members));
        $http.post('http://localhost:8282/member_del', JSON.stringify(members)).success(function(response){
        }).error(function(){
            alert("an unexpected error ocurred!");
        });
    }
});

myApp.directive('stRatio', function() {
    return {
        link: function(scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});
