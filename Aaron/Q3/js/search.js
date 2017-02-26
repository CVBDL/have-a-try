'use strict'

$(document).ready(function(){
  	$("form").submit(function(e){
	  	var keyword = document.getElementById("searchbox").value;
	  	var newurl = "https://github.com/search?utf8=%E2%9C%93&q=" + keyword;
		$.ajax({
			url: newurl,
			//data:{Full:"fu"},
			type: "GET",
			dataType:'json',
			});
  	});
});