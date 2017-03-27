var queryResults;
var resultCount = 10;
var displayIndex = 0;

$(document).ready(function () {
    $("#btnQuery").click(onBtnQuery);
    $("#btnShowMore").click(onBtnShowMore);
});

function ajaxCallback(data) {
    queryResults = data;
    refreshData();
}


String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}

function onBtnQuery() {
    var queryString = $("#txtQueryString").val();
    var url = "https://api.github.com/search/repositories?q=" + queryString;
    $.getJSON(url, ajaxCallback);
}

function onBtnShowMore() {
    appendData();
    appendData();
    onRefreshShowMoreBtn();
}

function onRefreshShowMoreBtn() {
    if (queryResults == undefined || queryResults == null) {
        $("#btnShowMore").hide(500);
    }

    if (displayIndex < queryResults["items"].length - 1) {
        $("#btnShowMore").show(500);
    }
    else {
        $("#btnShowMore").hide(500);
    }
}

function refreshData() {
    if (queryResults == undefined || queryResults == null) {
        alert("please waiting load the information...");
    }

    if (queryResults["items"].length == 0) {
        alert("there is no data to display.");
    }

    $("#row").empty();

    displayIndex = 0;
    while (displayIndex < queryResults["items"].length && displayIndex < resultCount) {
        appendData();
    }

    onRefreshShowMoreBtn();
}

function appendData() {
    if (displayIndex < queryResults["items"].length) {
        var name = queryResults["items"][displayIndex]["full_name"];
        var des = queryResults["items"][displayIndex]["description"];
        var content = "<div class='col-sm-6 col-xs-12'><h4>{0}</h4><h4>{1}</h4></div>".format(name, des);
        $("#row").append(content);
        displayIndex++;
    }
}