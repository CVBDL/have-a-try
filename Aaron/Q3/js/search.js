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
		dataType:'json'
		});
}
