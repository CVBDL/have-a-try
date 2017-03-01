'use strict'

function queryData() {
    var argKeyword = $("#keyword").val();
    if(null == argKeyword || argKeyword == ""){
        return;
    }

    startQuery();
    
    var queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
    $.getJSON(queryUrl,function (data, textStatus, jqXHR) {
            if ('success' != textStatus) {
                return;
            }
            displayData(data);
        }
    )
}

var progressTimer = null;

function startQuery(){
    var progressBar = $("#progress");
    progressBar.show();
    progressBar.attr("value", 0);
    var nPos = 0;
    progressTimer = setInterval(function(){
        nPos += 10;
        progressBar.attr("value", nPos);
        if(nPos >= 900){
            clearInterval(progressTimer);
        }
    }, 10)
}

function queryDone(){
    $("#progress").attr("value", 1000);
    $("#progress").hide();
    clearInterval(progressTimer);
}

function displayData(data) {
    if (null == data) {
        return;
    }
    queryDone();

    var dataCount = data.items.length;
    var index = 0;
    $('#tab').children().each(function(){
        $(this).html('<p>' + data.items[index]['full_name'] + '<br />'+ data.items[index]['description'] + '</p>').css('border', 'solid 2px #000000');
        index++;
        if (index >= dataCount) {
            return;
        }
    });
}

(function () {
    $(document).ready(function () {
        $("#progress").attr("value", 0);
        $("#progress").hide();
    });

    $("#searchButton").click(queryData);
})();