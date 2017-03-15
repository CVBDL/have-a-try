'use strict'



var dataItems = null;
$(document).ready(function () {

  $("#progress").attr("value", 0);
  $("#searchButton").click(queryData);
  $("#showMoreBtn").click(showMoreResult);

});

function queryData() {

  let argKeyword = $("#keyword").val();
  if (null == argKeyword || argKeyword == "") {
    return;
  }

  let progressSetter = null;
  startQuery(progressSetter);

  let queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
  $.getJSON(queryUrl, function (data, textStatus, jqXHR) {
    if ('success' != textStatus) {
      return;
    }
    queryDone(progressSetter);
    displayData(data);
  }
  )
}


function startQuery(setter) {

  let progressBar = $("#progress");
  progressBar.attr("value", 0);
  progressBar.removeClass("progressDone").addClass('progress');
  let nPos = 0;
  setter = setInterval(function () {

    nPos += 10;
    progressBar.attr("value", nPos);
    if (nPos >= 900) {
      clearInterval(setter);
    }

  }, 10)
}

function queryDone(setter) {
  let progressBar = $("#progress");
  progressBar.removeClass("progress").addClass('progressDone');
  progressBar.attr("value", 1000);
  clearInterval(setter);
}

function displayData(data) {

  if (null == data) {
    return;
  }
  dataItems = data.items;
  let dataCount = data.items.length;
  let index = 0;

  $('#tab').children().each(function () {

    $(this).html('<p>' + data.items[index]['full_name'] + '<br />' + data.items[index]['description'] + '</p>').css('border', 'solid 2px #000000');
    index++;
    if (index >= dataCount) {
      return;
    }
  });
}

function showMoreResult() {
  let currentCount = $('#tab').children().length;
  let itemCount = dataItems.length;

  if (itemCount > currentCount) {
    
  }
}



