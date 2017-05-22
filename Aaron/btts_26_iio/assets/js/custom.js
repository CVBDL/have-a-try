


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

        var myApp = angular.module("myApp", [&apos;ui.router&apos;]);
        myApp.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when("", "/index");
            $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "index.html"
        })
        .state("index.pc", {
            url:"/pc",
            templateUrl: "pc.html"
        })
        .state("index.mobile", {
            url:"/mobile",
            templateUrl: "mobile.html"
        })
        .state("index.vm", {
            url:"/vm",
            templateUrl: "vm.html"
        });
        });
});
}(jQuery));


