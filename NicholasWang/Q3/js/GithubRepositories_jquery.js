var searchType = "javascript";
$(document).ready(queryAjax);

function queryAjax () {
  // $("#main").empty();
  $("#searchText").val(searchType);
  $.getJSON("https://api.github.com/search/repositories?q=" + searchType, function (formatedContent) {
    if (!$("#main").has("div").length) {
      for (var i = 0; i < 10; i += 2) {
        $("#main").append("<div id=div" + i.toString() + " class='main-left'><h2>" + formatedContent["items"][i]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i]["description"] + "</b></div>");
        $("#main").append("<div id=div" + (i + 1).toString() + " class='main-right'><h2>" + formatedContent["items"][i + 1]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i + 1]["description"] + "</b></div>");
      }
    }
    else {
      for (var i = 0; i < 10; i += 2) {
        $("#div" + i.toString()).html("<h2>" + formatedContent["items"][i]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i]["description"] + "</b>");
        $("#div" + (i + 1).toString()).html("<h2>" + formatedContent["items"][i + 1]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i + 1]["description"] + "</b>");
      }
    }
  });
}

$("#btnSearch").click(function () {
  searchType = $("#searchText").val();
  console.log(searchType);
  queryAjax();
});