
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope,$http) {
        $scope.getData = function(){
            $scope.searchButtonStatus = true;
            $http.get('https://api.github.com/search/repositories?q='+$scope.searchKeyWord).then(function(result){
                    var DataArray = new Array();
                    var resultArray = result.data.items;
                    $.each(resultArray, function (index, item) {  
                        if( index >=10)
                            return false;
                        //循环获取数据    
                        var name = resultArray[index].full_name;  
                        var description = resultArray[index].description;
                        var jsonData = { 'name':name, 'description': description};
                        DataArray.push(jsonData);                
                });
                $scope.DataArray = DataArray;
                $scope.searchButtonStatus = false;
            });
        }
    });





