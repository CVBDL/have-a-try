var xmlhttp;

function loadXMLDoc() {
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = onResponse;
  xmlhttp.open("GET", "https://api.github.com/search/repositories?q=javascript", true);
  // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send();
  console.log("xmlhttp.send()");
}

function onResponse() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("response successfully!");
      var content = xmlhttp.responseText;
      var formatedContent = JSON.parse(content);
      // alert(formatedContent);
      // document.getElementById("myDiv").innerHTML = content;
      // var finalContent = null;
      for (var i = 0; i < 10; i+=2) {
        // finalContent += formatedContent["items"][i]["full_name"];
        // finalContent += formatedContent["items"][i]["description"];
        // console.log(finalContent);
        var divLeft = document.createElement("div");
        divLeft.className = "main-left";
        divLeft.innerHTML = "<h2>" + formatedContent["items"][i]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i]["description"] + "</b>";
        document.getElementById("main").appendChild(divLeft);
        var divRight = document.createElement("div");
        divRight.className = "main-right";
        divRight.innerHTML = "<h2>" + formatedContent["items"][i+1]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i+1]["description"] + "</b>";
        document.getElementById("main").appendChild(divRight);
      }
      // document.getElementById("myDiv").innerHTML = finalContent;
    }
}