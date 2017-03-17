'use strict'

$(document).ready(function () {
  $("#progress").attr("value", 0);
  $("#searchButton").click(queryData);
});

function queryData() {
  var argKeyword = $("#keyword").val();
  var progressInterval = null;
  startQuery(progressInterval);

  var queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
  $.getJSON(queryUrl, function (data, textStatus, jqXHR) {
    if ("success" != textStatus) {
      return;
    }

    queryDone(progressInterval);
    displayData(data);
  })
}


function startQuery(progressInterval) {
  var progressBar = $("#progress");
  progressBar.removeClass("progressDone").addClass("progress").attr("value", 0);

  var nPos = 0;
  progressInterval = setInterval(function () {
    nPos += 10;
    progressBar.attr("value", nPos);
    if (nPos >= 900) {
      clearInterval(setter);
    }

  }, 10)
}

function queryDone(setter) {
  $("#progress").removeClass("progress").addClass("progressDone").attr("value", 1000);
  clearInterval(setter);
}

function displayData(data) {
  if (null == data) {
    return;
  }

  var dataCount = data.items.length, index = 0;

  $('#tab').children().each(function () {

    $(this).html("");
    $(this).html('<p>' + data.items[index]['full_name'] + '<br />' + data.items[index]['description'] + '</p>').css('border', 'solid 2px #000000');
    index++;
    if (index >= dataCount) {
      return;
    }

  });
}


