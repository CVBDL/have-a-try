	//jQuery.ajaxSetup({async:false});
	var app = angular.module('github_repository', []);
	app.controller('control', function($scope){
		$scope.quantity = 10;
		$scope.items = null;
		$scope.updateItemsShownCount = function($event, count){
			$(".show_items_count .btn").removeClass("btn_highlight");
			$($event.target).addClass("btn_highlight");
			$scope.quantity = count;
		}
		$scope.doSearch = function(){
			$.get("https://api.github.com/search/repositories?q=" + $scope.search, function(result){
			$scope.items = result.items;
            $scope.$apply();
			});
		};

		if($scope.search == undefined)
			$scope.search = "javascript";

		$.get("https://api.github.com/search/repositories?q=" + $scope.search, function(result){
			$scope.items = result.items;
			$scope.$apply();
		});
	});
