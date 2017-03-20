'use strict';

$(document).ready(function() {
  $("#myForm").on("submit", function(ev) {
    ev.preventDefault();
  });
});

var allMsg = "",
  curNum = 9,
  repoIndex = 0,
  curMaxNum = 0,
  startIndex = 0,
  endIndex = 0;

$("#searchbtn").click(function() {
  curNum = 9;
  $("#myDiv").empty();
  $("#repo_list").empty();
  $("#more").empty();
  htmlrequest(1,15);
});

$("#more").on("click", "#morebtn", function() {
  var exthtml = insertHTML(2);
  $("#repo_list").append(exthtml);
  endIndex = curMaxNum + 2;
  curMaxNum = showResult(curMaxNum, endIndex);

  if(repoIndex != allMsg.total_count) {
    $("h2").html("Top " + repoIndex + " repositories!");
  } else {
    $("h2").html("Totally " + repoIndex + " repositories found!");
  }

//if (curMaxNum%12 == 0){
//  htmlrequest(2,15);
//}
});

function htmlrequest(p,n) {
  $.ajax({
    type: "GET",
    url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val() + "&page=" + p + "&per_page=" + n,
    dataType: 'json',
    beforeSend: function(XMLHttpRequest) {
      $("#loading").html("<img src='img/loading.gif'/>");
    },
    success: function(msg) {
      allMsg = msg;
      if(msg.total_count < 10) {
        curMaxNum = msg.total_count;
      } else {
        curMaxNum = 10;
      }
      if(curMaxNum != 0 && curMaxNum < 10) {
        $("#myDiv").html('<h2>Totally ' + curMaxNum + ' repositories found!</h2>');
      } else if(curMaxNum >= 10) {
        $("#myDiv").html('<h2>Top 10 repositories!</h2>');
      } else {
        $("#myDiv").html("<h2>No results found!</h2>");
      }
      var htmlstr = insertHTML(curMaxNum);
      $("#repo_list").html(htmlstr);
      curMaxNum = showResult(startIndex, curMaxNum);
    },
    complete: function(XMLHttpRequest, textStatus) {
      $("#loading").empty();
    },
    error: function(data, status, e) {
      if($("#searchbox").val() == "") {
        alert("Please input some key words.")
      } else {
        alert("Some error occurs.");
      }
    },
  });
}

function insertHTML(times) {
  var htmlstr = "";
  for(var i = 0; i < times; i++) {
    var ran = parseInt(10 * Math.random());
    htmlstr += '<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/' + ran + '.jpg"><span class="card-title" id="title' + repoIndex + '"></span></div><div class="card-content" id="content' + repoIndex + '"><p></p></div><div class="card-action"><a id="link' + repoIndex + '" href="#">Link To</a></div></div></div></div>'
    repoIndex += 1;
    if(repoIndex == allMsg.total_count) {
      $("#more").empty();
    }
  }
  return htmlstr;
}

function showResult(st, ed) {
  for(var i = st; i < ed; i++) {
    //	$(".row div:gt(startIndex)").each(function(startIndex) {
    $("#title" + i).text(allMsg.items[i].full_name);
    $("#content" + i).text(allMsg.items[i].description);
    $("#link" + i).attr("href", allMsg.items[i].html_url);
  }
  if(allMsg.total_count > 10) {
    $("#more").html("<input type='button' id='morebtn' value='Show More' class='waves-effect waves-light btn'/>");
  }
  //	console.log(addRepo);
  return ed;
}