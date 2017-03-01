'use strict'


$(document).ready(function () {

    $("#progress").attr("value", 0);
    $("#progress").hide();
    $("#searchButton").click(queryData);

});

function queryData() {

    var argKeyword = $("#keyword").val();
    if(null == argKeyword || argKeyword == ""){
        return;
    }
    
    var progressSetter = null;
    startQuery(progressSetter);
    
    var queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
    $.getJSON(queryUrl,function (data, textStatus, jqXHR) {
            if ('success' != textStatus) {
                return;
            }
            queryDone(progressSetter);
            displayData(data);
        }
    )
}


function startQuery(setter){

    var progressBar = $("#progress");
    progressBar.show();
    progressBar.attr("value", 0);

    var nPos = 0;
    setter = setInterval(function(){

        nPos += 10;
        progressBar.attr("value", nPos);
        if(nPos >= 900){
            clearInterval(setter);
        }

    }, 10)
}

function queryDone(setter){
    var progressBar = $("#progress");

    progressBar.attr("value", 1000);
    progressBar.hide();
    clearInterval(setter);
}

function displayData(data) {

    if (null == data) {
        return;
    }

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



   