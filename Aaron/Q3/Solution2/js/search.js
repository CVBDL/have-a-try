'use strict'

$(document).ready(function(){
	$("#myForm").on("submit",function(ev){
		ev.preventDefault();
	});
});
function clicksearch(){
	$("#myDiv").empty();
	$("#repo_list").empty();
	$.ajax({
		type: "GET",
        url: "https://api.github.com/search/repositories?q="+$("#searchbox").val(),
		dataType:'json',
		beforeSend:function(XMLHttpRequest){
         	$("#loading").html("<img src='img/loading.gif' />"); 
         }, 
		success: function(msg){
	   	$("#myDiv").html("<h2>Top 10 repositories!</h2>");
	   	var htmlstr=""
		for(var i=0;i<10;i++){
		htmlstr+='<div class="row"><div class="col s12 m7"><div class="small card"><div class="card-image"><img src="./img/'+i+'.jpg"><span class="card-title" id="title'+i+'"></span></div><div class="card-content" id="content'+i+'"><p></p></div><div class="card-action"><a id="link'+i+'" href="#">Link To</a></div></div></div></div>'
		}
		$("#repo_list").html(htmlstr);
 		$(".row").each(function(i){
		$("#title"+i).text(msg.items[i].full_name);
		$("#content"+i).text(msg.items[i].description);
		$("#link"+i).attr("href",msg.items[i].html_url); 
		});
		},
		complete:function(XMLHttpRequest,textStatus){ 
             $("#loading").empty(); 
        }, 
		error: function(data, status, e){ 
     	alert("error"); 
   		},
	});
}
