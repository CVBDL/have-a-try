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

    var tab = document.getElementById("tab");
    if (null == tab) {
        return;
    }
    var pageStatus = document.getElementById('status');
    if (null == pageStatus) {
        return;
    }

    pageStatus.innerHTML='data';
    
    var dataCount = data.items.length;
    var index = 0;
    var cellElmement = tab.firstElementChild;
    while (cellElmement) {
        cellElmement.innerHTML = '<p>' + data.items[index]['full_name'] + '<br />'+ data.items[index]['description'] + '</p>';
        cellElmement.style.border="solid 2px #000000";
        cellElmement = cellElmement.nextElementSibling;
        index++;
        if (index >= dataCount) {
            break;
        }
    }
}
