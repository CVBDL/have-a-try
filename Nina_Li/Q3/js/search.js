


$(document).ready(function(){
	$(".cell").empty();
	$("button").click(search);
});

function search(){
	
	var keyword = $("#txtInput").val();
	if(keyword == undefined || keyword == null)
	{
		alert("Error is occured!");
		return;
	}
	
	if(keyword == "")
	{
		alert("Please input the keyword!");
		return;
	}

	var url = "https://api.github.com/search/repositories?q=" + keyword;
	$.get(url, function(data,status){
		 
		if(status !=  "success"){
			alert("Not find!");
			return;
		}
		
		analyzeData(data);
    });
}

function analyzeData(data){
	
	var repositoryNum = 10;
	var items = data["items"];
	var result="";
	
	
	$(".cell").each(function(index){
		
		var repositoryInfo = items[index];
		var result ="";
		
		result = result + repositoryInfo["full_name"] + "<br>" + "<br>";
		result =  result + repositoryInfo["description"];
		$( this ).html(result);
		
	}	
	);
	
			
	
}