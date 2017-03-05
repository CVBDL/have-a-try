window.onload = function () {
    request = new XMLHttpRequest();
    request.onreadystatechange = onstatechange;
    request.open("GET", "https://api.github.com/search/repositories?q=javascript", true);
    request.send();
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}

function onstatechange() {
    if (request.readyState == 4 && request.status == 200) {
        var data = request.responseText;
        var obj = JSON.parse(data);
        var container = document.getElementById("container");
        var tr;
        for (var i = 0; i < 10; i++) {
            var name = obj["items"][i]["full_name"];
            var des = obj["items"][i]["description"];
            var cell = document.createElement("div");
            cell.innerHTML = "<h4>{0}</h4><h4>{1}</h4>".format(name, des);
            cell.className += "cell";
            container.appendChild(cell);
        }
    }
}