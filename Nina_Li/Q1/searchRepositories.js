

function loadRepositories()
{
	var xmlhttp;
	//var result = "";
//	var resultArray = new Array();
	var repositoryNum = 10;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var table = document.getElementById("repositoryTableId");
			var text = JSON.parse(xmlhttp.responseText);
			var items = text["items"];
			var result="";
			
			for(var index = 0; index < repositoryNum; index++)
			{
				var repositoryInfo = items[index];
				var result ="";
				var tr,td;
				
				result = result + repositoryInfo["full_name"] + "<br>" + "<br>";
				result =  result + repositoryInfo["description"];
				
				tr = table.getElementsByTagName("tr");
				td = tr[Math.floor(index / 2)].getElementsByTagName("td")[index % 2];
				td.innerHTML = result;		
			}
			
			var footerInfo = document.getElementById("ftr");
			footerInfo.innerHTML ="共" + repositoryNum +"条";
		}
	}
	
	xmlhttp.open("GET","https://api.github.com/search/repositories?q=javascript",true);
	xmlhttp.send();
	
}