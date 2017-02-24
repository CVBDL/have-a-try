function loadData()
{
  var xhr;
  
  if (window.XMLHttpRequest)
  {
    //  IE7+, Firefox, Chrome, Opera, Safari
    xhr=new XMLHttpRequest();
  }
  else
  {
    // IE5,6
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xhr.open("GET","https://api.github.com/search/repositories?q=javascript",true);
  xhr.send();

  xhr.onreadystatechange = function()
  {
    if (4 == xhr.readyState && 200 == xhr.status)
    {
      var table = document.getElementById("repTableId");
      var dataSource = JSON.parse(xhr.responseText);
      var items = dataSource["items"];
      var repNum = 10;
      for(var index = 0; index < repNum; index++)
      {
        var repInfo = items[index];
        var data ="";
        var tr,td;
        
        data = data + repInfo["full_name"] + "<br>";
        data =  data + repInfo["description"];
        
        tr = table.getElementsByTagName("tr");
        td = tr[Math.floor(index / 2)].getElementsByTagName("td")[index % 2];
        td.innerHTML = data;    
      }
    }
  } 
}