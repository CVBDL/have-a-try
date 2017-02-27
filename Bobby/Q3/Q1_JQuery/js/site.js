'use strict'

function onPageLoad() {
    $.getJSON("https://api.github.com/search/repositories?q=javascript",
        function (data, textStatus, jqXHR) {
            if ('success' != textStatus) {
                return;
            }
            displayData(data);
        },
    );
}

function displayData(data) {
    if (null == data) {
        return;
    }

     $('#status').text("data");

    var table = $('#contentTable');
    if (null == table) {
        return;
    }

    table.attr('border', '2');

    var maxCount = 10;
    var count = 0;
    var reposInOneRow = 2;
    var newRow = null;
    for (var index in data.items) {
        if (count % reposInOneRow == 0) {
            table.append("<tr></tr>>");
            newRow = table.find("tr:last")
        }

        newRow.append("<td>" + data.items[index]['full_name'] + "<br />" + data.items[index]['description']);
        ++count;
        if (count >= maxCount) {
            return;
        }
    }
}
