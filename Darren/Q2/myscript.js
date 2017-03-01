function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "https://api.github.com/search/repositories?q=javascript", true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseText;
  var table="";
  var str = JSON.parse(xmlDoc);
  var x = str["items"];
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i]["full_name"] + "<br/>" + x[i]["description"] +
    "</td><td>" +
    x[++i]["full_name"] + "<br/>" + x[++i]["description"] +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}