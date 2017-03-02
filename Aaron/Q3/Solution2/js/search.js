'use strict'

$(document).ready(function(){
	$("#myForm").on("submit",function(ev){
		ev.preventDefault();
	});
});
function clicksearch(){
	$.ajax({
		type: "GET",
        url: "https://api.github.com/search/repositories?q="+$("#searchbox").val(),
		dataType:'json',
		success: function(msg){
	   	$("#myDiv").html("<h2>Top 10 repositories!</h2>");
	   	var htmlstr=""
		for(var i=0;i<10;i++){
		htmlstr+='<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/'+i+'.jpg"><span class="card-title" id="title'+i+'">abc</span></div><div class="card-content" id="content'+i+'"><p>qwe</p></div><div class="card-action"><a id="link'+i+'" href="#">Link To</a></div></div></div></div>'
		}
		$("#repo_list").html(htmlstr);
 		$(".row").each(function(i){
		$("#title"+i).text(msg.items[i].full_name);
		$("#content"+i).text(msg.items[i].description);
		$("#link"+i).attr("href",msg.items[i].html_url); 
		});
//		},
//		error: function(data, status, e){ 
//   	alert("error"); 
   	}
	});
}
