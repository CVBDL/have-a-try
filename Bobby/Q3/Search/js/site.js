'use strict'

function queryData() {
    var argKeyword = $("#keyword").val();
    if(null == argKeyword){
        return;
    }
    
    var queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
    $.getJSON(queryUrl,function (data, textStatus, jqXHR) {
            if ('success' != textStatus) {
                return;
            }
            displayData(data);
        }
    )
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

(function () {
    $("#searchButton").click(queryData);
})();