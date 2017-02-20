'use strict'

var gXmlhttpRequest = null;
function onPageLoad() {
    gXmlhttpRequest = new XMLHttpRequest();
    gXmlhttpRequest.onreadystatechange = function () {
        if (null == gXmlhttpRequest || 4 != gXmlhttpRequest.readyState || 200 != gXmlhttpRequest.status) {
            return;
        }
        var json = JSON.parse(gXmlhttpRequest.responseText)
        displayData(json);
    }

    gXmlhttpRequest.open('GET', 'https://api.github.com/search/repositories?q=javascript');
    gXmlhttpRequest.send();
}

function displayData(data) {
    if (null == data) {
        return;
    }

    var table = document.getElementById('contentTable');
    if (null == table) {
        return;
    }

    var pageStatus = document.getElementById('status');
    pageStatus.innerHTML='data';

    table.setAttribute('border', '2');

    var maxCount = 10;
    var count = 0;
    var reposInOneRow = 2;
    var newRow = null;
    for (var index in data.items) {
        if (count % reposInOneRow == 0) {
            newRow = table.insertRow();
        }

        var newCell = newRow.insertCell();
        newCell.innerHTML = data.items[index]['full_name'] + '<br />'+ data.items[index]['description'];

        ++count;
        if (count >= maxCount) {
            return;
        }
    }
}
