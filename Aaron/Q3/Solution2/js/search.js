'use strict'

$(document).ready(function() {
	$("#myForm").on("submit", function(ev) {
		ev.preventDefault();
	});
});

function clicksearch() {
	$("#myDiv").empty();
	$("#repo_list").empty();
	$("#more").empty();
	$.ajax({
		type: "GET",
		url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val(),
		dataType: 'json',
		beforeSend: function(XMLHttpRequest) {
			$("#loading").html("<img src='img/loading.gif' />");
		},
		complete: function(XMLHttpRequest, textStatus) {
			$("#loading").empty();
		},
		success: function(msg) {
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
				console.log(msg.total_count);
				$("#more").html("<input type='button' id='morebtn' value='Show More' class='waves-effect waves-light btn' onclick='showmore()'/>");
			}
		},
		error: function(data, status, e) {
			alert("error");
		},
	});
}

function showmore() {
	console.log("more is coming");
}