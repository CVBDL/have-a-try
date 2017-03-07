var queryResults;
var resultCount = 10;

$(document).ready(function () {
    $.getJSON("https://api.github.com/search/repositories?q=javascript", ajaxCallback);
});

function ajaxCallback(data) {
    queryResults = data;
}


String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}

function btnOnclick() {
    var queryString = $("#txtQueryString").val();
    query(queryString);
}

function query(str) {
    if (queryResults == undefined || queryResults == null) {
        alert("please waiting load the information...");
    }
    str = str.toLowerCase();
    if (str == "")
        return;

    $("#container").empty();

    var i = 0;
    var j = 0;
    var length = queryResults["items"].length;

    while (i < length && j < resultCount) {
        var name = queryResults["items"][i]["full_name"];
        var des = queryResults["items"][i]["description"];
        var nameLower = name != null ? name.toLowerCase() : "";
        var desLower = des != null ? des.toLowerCase() : "";

        if (nameLower.indexOf(str) > 0 || desLower.indexOf(str) > 0) {
            var content = "<div class='cell'><h4>{0}</h4><h4>{1}</h4></div>".format(name, des);
            $("#container").append(content);
            j++;
        }
        i++;
    }
}