'use strict'

$(document).ready(function () {
  $('#progress').attr('value', 0);
  $('#searchButton').click(queryData);
  $('#keyword').keypress(function (event) {
    if (13 == event.keyCode) {
      queryData();
    }
  });
});

function queryData() {
  var keyWord = $('#keyword').val();
  if (!keyWord || keyWord.length == 0) {
    return;
  }
  var progressInterval = null;

  startQuery(progressInterval);
  var queryUrl = 'https://api.github.com/search/repositories?q=' + keyWord;
  $.getJSON(queryUrl, function (data, textStatus, jqXHR) {
    if ('success' != textStatus) {
      return;
    }

    queryDone(progressInterval);
    displayData(data);
  })
}


function startQuery(interval) {
  var progressBar = $('#progress');
  progressBar.removeClass('progressDone').addClass('progress').attr('value', 0);

  var nPos = 0;
  interval = setInterval(function () {
    nPos += 10;
    progressBar.attr('value', nPos);
    if (nPos >= 900) {
      clearInterval(interval);
    }

  }, 10)
}

function queryDone(interval) {
  $('#progress').removeClass('progress').addClass('progressDone').attr('value', 1000);
  clearInterval(interval);
}

function displayData(data) {
  if (null == data) {
    return;
  }

  var dataCount = data.items.length, index = 0;

  $('#tab').children().each(function () {

    $(this).html('<p>' + data.items[index]['full_name'] + '<br />' + data.items[index]['description'] + '</p>').css('border', 'solid 2px #000000');
    index++;
    if (index >= dataCount) {
      return;
    }

  });
}


