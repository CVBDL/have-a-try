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
    }).state("dash.task", {
        url: "/task",
        templateUrl: "task.html"
    });
});

myApp.controller('myCtrl',function($scope, $http, $rootScope){
    $http.get('http://localhost:8282/pc_get').success(function(response){
      $rootScope.pcnum = response.length;
      console.log($rootScope.pcnum);
    }).error(function(){
        alert("an unexpected error ocurred!");
    });
    $http.get('http://localhost:8282/mobile_get').success(function(response){
      $rootScope.mobilenum = response.length;
      console.log($rootScope.mobilenum);
    }).error(function(){
        alert("an unexpected error ocurred!");
    });
    $http.get('http://localhost:8282/vm_get').success(function(response){
      $rootScope.vmnum = response.length;
      console.log($rootScope.vmnum);
    }).error(function(){
        alert("an unexpected error ocurred!");
    });
    $http.get('http://localhost:8282/mac_get').success(function(response){
      $rootScope.macnum = response.length;
      console.log($rootScope.macnum);
    }).error(function(){
        alert("an unexpected error ocurred!");
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

myApp.controller('basicsCtrl', function($scope, $http, $rootScope) {
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.row123.indexOf(row);
        if (index !== -1) {
            $scope.row123.splice(index, 1);
        }
           $http.post('http://localhost:8282/vm_del', JSON.stringify($scope.row123)).success(function(response){
            $rootScope.vmnum -= 1;
           }).error(function(){
               alert("an unexpected error ocurred!");
           });
    };

    $scope.itemsByPage = 5;

    $http.get('http://localhost:8282/vm_get').success(function(response){
      $scope.row123 = response;
      $scope.rowCollection = response;
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
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });

        $http.get('http://localhost:8282/vm_get').success(function(response){
              $rootScope.vmnum = response.length;
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

myApp.controller('pcCtrl', function($scope, $http, $rootScope) {
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.rowpc.indexOf(row);
        if (index !== -1) {
            $scope.rowpc.splice(index, 1);
        }
           $http.post('http://localhost:8282/pc_del', JSON.stringify($scope.rowpc)).success(function(response){
            $rootScope.pcnum -= 1;
           }).error(function(){
               alert("an unexpected error ocurred!");
           });
    };

    $scope.itemsByPage = 5;

    $http.get('http://localhost:8282/pc_get').success(function(response){
      $scope.rowpc = response;
      $scope.rowCollection = response;
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
     $scope.addPC = function(){
        var newPC = {
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    };

        $http.post('http://localhost:8282/pc_post', newPC).success(function(){
            $scope.msg = 'Data saved';
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });

        $http.get('http://localhost:8282/pc_get').success(function(response){
          $rootScope.pcnum = response.length;
            }).error(function(){
                alert("an unexpected error ocurred!");
            });
        $scope.rowpc.push({
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
        var newPC = {
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

myApp.controller('mobileCtrl', function($scope, $http, $rootScope) {
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.rowmobile.indexOf(row);
        if (index !== -1) {
            $scope.rowmobile.splice(index, 1);
        }
           $http.post('http://localhost:8282/mobile_del', JSON.stringify($scope.rowmobile)).success(function(response){
            $rootScope.mobilenum -= 1;
           }).error(function(){
               alert("an unexpected error ocurred!");
           });
    };

    $scope.itemsByPage = 5;

    $http.get('http://localhost:8282/mobile_get').success(function(response){
      $scope.rowmobile = response;
      $scope.rowCollection = response;
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
     $scope.addMobile = function(){
        var newMobile = {
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    };

        $http.post('http://localhost:8282/mobile_post', newMobile).success(function(){
            $scope.msg = 'Data saved';
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });

        $http.get('http://localhost:8282/mobile_get').success(function(response){
          $rootScope.mobilenum = response.length;
            }).error(function(){
                alert("an unexpected error ocurred!");
            });
        $scope.rowmobile.push({
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
        var newMobile = {
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

myApp.controller('macCtrl', function($scope, $http, $rootScope) {
    // Remove Row
    $scope.removeRow = function removeRow(row) {
        var index = $scope.rowmac.indexOf(row);
        if (index !== -1) {
            $scope.rowmac.splice(index, 1);
        }
           $http.post('http://localhost:8282/mac_del', JSON.stringify($scope.rowmac)).success(function(response){
            $rootScope.macnum -= 1;
           }).error(function(){
               alert("an unexpected error ocurred!");
           });
    };

    $scope.itemsByPage = 5;

    $http.get('http://localhost:8282/mac_get').success(function(response){
      $scope.rowmac = response;
      $scope.rowCollection = response;
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
     $scope.addMac = function(){
        var newMac = {
                      host_name: $scope.host_name,
                      ip_address: $scope.ip_address,
                      op_system: $scope.op_system,
                      owner: $scope.owner,
                      email: $scope.email,
                      production: $scope.production,
                      notes: $scope.notes
                    };

        $http.post('http://localhost:8282/mac_post', newMac).success(function(){
            $scope.msg = 'Data saved';
        }).error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
        });

        $http.get('http://localhost:8282/mac_get').success(function(response){
          $rootScope.macnum = response.length;
            }).error(function(){
                alert("an unexpected error ocurred!");
            });
        $scope.rowmac.push({
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
        var newMac = {
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

myApp.controller('todoListCtrl', ['$scope', function($scope){

        $scope.todos = [
            {text:'Create new test cases and implement automation script.',done:true,showing:true,warning:''},
            {text:'Run BAT test on latest build.',done:false,showing:true,warning:''},
            {text:'Debug automation scripts on CI system.',done:false,showing:true,warning:''}
        ];
        $scope.changeFlag = function(index){
            if(!$scope.todos[index].done){
                $scope.todos.forEach(function(ele,i){
                    if(i != index) ele.showing = true;
                });
                $scope.todos[index].showing = !$scope.todos[index].showing;
            }
        }
        $scope.remaining = function(){
            var count = 0;
            $scope.todos.forEach(function(ele){
                count += ele.done ? 0 : 1;
            });
            return count;
        }
        $scope.addTodo = function(){
            $scope.todos.push(
                {text:$scope.todoText,
                  done:false,
                  showing:true,
                  warning:''}
            );
            $scope.todoText = '';
        }
        $scope.archive = function(){
            $scope.todos = $scope.todos.filter(function(ele){
                return !ele.done;
            });
        }
        $scope.tooltipWarning = function(index){
            if($scope.todos[index].done){
                $scope.todos[index].warning = "Done task couldn't be modified.";
            }else{
                $scope.todos[index].warning = "";
            }
        }
    }]);

myApp.directive('stRatio', function() {
    return {
        link: function(scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});