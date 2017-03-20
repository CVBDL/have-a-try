'use strict';

$(document).ready(function() {
  $("#myForm").on("submit", function(ev) {
    ev.preventDefault();
  });
});
var allMsg = "", curNum = 9, repoIndex = 0, curMaxIndex = 0;

$("#searchbtn").click(function() {
  curNum = 9;
  $("#myDiv").empty();
  $("#repo_list").empty();
  $("#more").empty();
  htmlrequest();
});

$("#more").on("click","#morebtn",function(){
  var exthtml=insertHTML(2);
  $("#repo_list").append(exthtml);
  showResult();
//for(var x = 1; x >= 0; x--) {
//  var test = curNum - x;
//  $("#title" + test).text(allMsg.items[test].full_name);
//  $("#content" + test).text(allMsg.items[test].description);
//  $("#link" + test).attr("href", allMsg.items[test].html_url);
//  if (test + 1 == allMsg.total_count) {
//    break;
//  }
//}
  if (repoIndex != allMsg.total_count) {
    $("h2").html("Top " + repoIndex + " repositories!");  
  } else {
    $("h2").html("Totally " + repoIndex + " repositories found!");
  }

});

function htmlrequest(){
	$.ajax({
    type: "GET",
    url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val() + "&page=1&per_page=100",
    dataType: 'json',
    beforeSend: function(XMLHttpRequest) {
      $("#loading").html("<img src='img/loading.gif'/>");
    },
    success: function(msg) {
      allMsg = msg;
      if(msg.total_count < 10) {
        curMaxIndex = msg.total_count;
      } else {
        curMaxIndex = 10;
      }
      if(curMaxIndex != 0 && curMaxIndex < 10) {
        $("#myDiv").html('<h2>Totally ' + curMaxIndex + ' repositories found!</h2>');
      } else if (curMaxIndex >= 10){
        $("#myDiv").html('<h2>Top 10 repositories!</h2>');
      } else{
        $("#myDiv").html("<h2>No results found!</h2>");
      }
      var htmlstr=insertHTML(curMaxIndex);
      $("#repo_list").html(htmlstr);
    	showResult(); 
    },
    complete: function(XMLHttpRequest, textStatus) {
      $("#loading").empty();
    },
    error: function(data, status, e) {
      if ($("#searchbox").val() == "") {
        alert ("Please input some key words.")
      } else {
        alert("Some error occurs.");
      }
    },
  });
}

function insertHTML(curMaxIndex) {
	var htmlstr = "";
	for(var i = 0; i < curMaxIndex; i++) {
		var ran = parseInt(10 * Math.random());
    htmlstr += '<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/' + ran + '.jpg"><span class="card-title" id="title' + i + '"></span></div><div class="card-content" id="content' + i + '"><p></p></div><div class="card-action"><a id="link' + i + '" href="#">Link To</a></div></div></div></div>'
    repoIndex += 1;
    if(repoIndex == allMsg.total_count) {
  		$("#more").empty();
 		}
	//考虑分页情况
	}
	return htmlstr;
}

function showResult(){
	var addRepo = repoIndex - curMaxIndex;
	$(".row").each(function(repoIndex) {
    $("#title" + repoIndex).text(allMsg.items[repoIndex].full_name);
		$("#content" + repoIndex).text(allMsg.items[repoIndex].description);
	  $("#link" + repoIndex).attr("href", allMsg.items[repoIndex].html_url);
	  console.log(repoIndex + "showresult");
	});
	if(allMsg.total_count > 10) {
	  $("#more").html("<input type='button' id='morebtn' value='Show More' class='waves-effect waves-light btn'/>");
	}
	console.log(addRepo);
}
