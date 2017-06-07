(function ($) {
    "use strict";
    var mainApp = {
        slide_fun: function () {

            $('#carousel-example').carousel({
                interval:3000 // THIS TIME IS IN MILLI SECONDS
            })

        },
        dataTable_fun: function () {
	if (document.getElementById('dataTables-example'))
            $('#dataTables-example').dataTable();

        },
       
        custom_fun:function()
        {
            /*====================================
             WRITE YOUR   SCRIPTS  BELOW
            ======================================*/
        },
    }

    $(document).ready(function () {
        mainApp.slide_fun();
        mainApp.dataTable_fun();
        mainApp.custom_fun();
    });
}(jQuery));



    var myApp = angular.module("myApp", ['ui.router']);
    myApp.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/Dashboard");
        $stateProvider
    .state("Dashboard", {
        url: "/Dashboard",
        templateUrl: "Dashboard.html"
    })
    .state("Dashboard.p1", {
        url:"/p1",
        templateUrl: "p1.html"
    })
    .state("Dashboard.p2", {
        url:"/p2",
        templateUrl: "p2.html"
    })
    .state("Dashboard.p3", {
        url:"/p3",
        templateUrl: "p3.html"  
    })
    .state("Dashboard.p4", {
        url:"/p4",
        templateUrl: "p4.html"  
    });
});