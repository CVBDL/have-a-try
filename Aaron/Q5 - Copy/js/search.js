'use strict';

$(document).ready(function() {
  $("#myForm").on("submit", function(ev) {
    ev.preventDefault();
  });
});

var allMsg = "",
  repoIndex = 0,
  curMaxNum = 0,
  startIndex = 0,
  endIndex = 0,
  curPg = 1,
  htmlstr = "";

$("#myForm").on("click", "#searchbtn", function(){
  $("#myDiv").empty();
  $("#repo_list").empty();
  $("#more").empty();
  curPg = 1;
  htmlrequest(curPg,15,1);
});

function htmlrequest(p,n,initial) {
  $.ajax({
    type: "GET",
    url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val() + "&page=" + p + "&per_page=" + n,
    dataType: 'json',
    beforeSend: function() {
      $("#loading").html("<img src='img/loading.gif'/>");
    },
    success: function(msg) {
      allMsg = msg;
    },
    complete: function() {
      $("#loading").empty();
      view(initial,allMsg);
    },
    error: function() {
      if($("#searchbox").val() == "") {
        alert("Please input some key words.")
      } else {
        alert("Some error occurs.");
      }
    }
  });
}

function view(initial,allMsg) {
  if(allMsg.total_count != 0 && allMsg.total_count < 10) {
    curMaxNum = allMsg.total_count;
    $("#myDiv").html('<h2>Totally ' + curMaxNum + ' repositories found!</h2>');
  } else if (allMsg.total_count >= 10){
    curMaxNum = 10;
    $("#myDiv").html('<h2>Top 10 repositories!</h2>');
  } else {
    $("#myDiv").html("<h2>No results found!</h2>");
  }
  if (initial == 1) {
    insertHTML(curMaxNum);
    $("#repo_list").html(htmlstr);
    showResult(startIndex, curMaxNum);
  }else{
    // insertHTML(2);
    // $("#repo_list").html(htmlstr);
    // showResult(startIndex, curMaxNum);
  }
}

function insertHTML(times) {
  htmlstr = "";
  for(var i = 0; i < times; i++) {
    var ran = parseInt(10 * Math.random());
    htmlstr += '<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image">' +
      '<img src="./img/' + ran + '.jpg"><span class="card-title" id="title' + repoIndex + '"></span></div>' +
      '<div class="card-content" id="content' + repoIndex + '"><p></p></div>' +
      '<div class="card-action"><a id="link' + repoIndex + '" href="#">Link To</a></div></div></div></div>';
    repoIndex += 1;
    if(repoIndex == allMsg.total_count) {
      $("#more").empty();
    }
  }
  return htmlstr;
}

$("#more").on("click", "#morebtn", function() {
  var exthtml = insertHTML(2);
  $("#repo_list").append(exthtml);
  endIndex = curMaxNum + 2;
  showResult(curMaxNum, endIndex);

  if(repoIndex != allMsg.total_count) {
    $("h2").html("Top " + repoIndex + " repositories!");
  } else {
    $("h2").html("Totally " + repoIndex + " repositories found!");
  }
});

function showResult(st, ed) {
  for (var i = st; i < ed; i++) {
    var j = i % 15;
    $("#title" + i).text(allMsg.items[j].full_name);
    $("#content" + i).text(allMsg.items[j].description);
    $("#link" + i).attr("href", allMsg.items[j].html_url);
    curMaxNum = i + 1;
    if (curMaxNum % 15 == 0){
      curPg += 1;
      htmlrequest(curPg,15,0);
    }
  }
  if (allMsg.total_count > 10) {
    $("#more").html("<input type='button' id='morebtn' value='Show More' class='waves-effect waves-light btn'/>");
  }
}