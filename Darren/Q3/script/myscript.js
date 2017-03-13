function loadDoc() {
  
  var argKeyword = $("#search_text").val();
    if(null == argKeyword){
        return;
    }
    
    var queryUrl = "https://api.github.com/search/repositories?q=" + argKeyword;
    $.getJSON(queryUrl,function (data, textStatus, jqXHR) {
            if ('success' != textStatus) {
                return;
            }
            myFunction(data);
        }
    )
  
}
function myFunction(data) {
  var i;

  var table="";
  var str = data;
  var x = str["items"];
  var length;
  if(x.length>10)
  {
  	length = 10;
  }
  else
  {
  	length = x.length;
  }
  
  for (i = 0; i < length; i++) {
    table += "<tr><td>" +
    x[i]["full_name"] + "<br/>" + x[i]["description"] +
    "</td><td>" +
    x[++i]["full_name"] + "<br/>" + x[++i]["description"] +
    "</td></tr>";
  }
  $("#demo").html(table);
  
}