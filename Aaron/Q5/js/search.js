'use strict'

$(document).ready(function() {
  $("#myForm").on("submit", function(ev) {
    ev.preventDefault();
  });
});
var allMsg = "";
var curNum = 9;

function clicksearch() {
  $("#myDiv").empty();
  $("#repo_list").empty();
  $("#more").empty();
  $.ajax({
    type: "GET",
    url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val() + "&page=1&per_page=100",
    dataType: 'json',
    beforeSend: function(XMLHttpRequest) {
      $("#loading").html("<img src='img/loading.gif' />");
    },
    complete: function(XMLHttpRequest, textStatus) {
      $("#loading").empty();
    },
    success: function(msg) {
      allMsg = msg;
      if(msg.total_count < 10) {
        var sum = msg.total_count;
      } else {
        sum = 10;
      }
      if(sum != 0) {
        $("#myDiv").html('<h2>Top ' + sum + ' repositories!</h2>');
      } else {
        $("#myDiv").html("<h2>No results found!</h2>");
      }
      var htmlstr = ""
      for(var i = 0; i < sum; i++) {
        htmlstr += '<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/' + i + '.jpg"><span class="card-title" id="title' + i + '"></span></div><div class="card-content" id="content' + i + '"><p></p></div><div class="card-action"><a id="link' + i + '" href="#">Link To</a></div></div></div></div>'
      }
      $("#repo_list").html(htmlstr);
      $(".row").each(function(i) {
        $("#title" + i).text(msg.items[i].full_name);
        $("#content" + i).text(msg.items[i].description);
        $("#link" + i).attr("href", msg.items[i].html_url);
      });
      if(msg.total_count > 10) {
        $("#more").html("<input type='button' id='morebtn' value='Show More' class='waves-effect waves-light btn' onclick='showmore()'/>");
      }
      return allMsg;
    },
    error: function(data, status, e) {
      alert("error");
    },
  });
}

function showmore() {
  var exthtml = "";
  for(var j = 0; j < 2; j++) {
    var ran = parseInt(10 * Math.random());
    curNum += 1;
    exthtml += '<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/' + ran + '.jpg"><span class="card-title" id="title' + curNum + '"></span></div><div class="card-content" id="content' + curNum + '"><p></p></div><div class="card-action"><a id="link' + curNum + '" href="#">Link To</a></div></div></div></div>';
    if(curNum + 1 >= allMsg.total_count) {
      $("#more").empty();
      break;
    }
  }
  $("#repo_list").append(exthtml);
  for(var x = 0; x < 2; x++) {
    var test = curNum - x;
    $("#title" + test).text(allMsg.items[test].full_name);
    $("#content" + test).text(allMsg.items[test].description);
    $("#link" + test).attr("href", allMsg.items[test].html_url);
  }
}