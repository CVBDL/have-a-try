var searchType = "javascript";
$(document).ready(queryAjax);

function queryAjax () {
  $("#main").empty();
  $("#searchText").val(searchType);
  $.getJSON("https://api.github.com/search/repositories?q=" + searchType, function (formatedContent) {
    for (var i = 0; i < 10; i += 2) {
      $("div#main").append("<div class='main-left'><h2>" + formatedContent["items"][i]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i]["description"] + "</b></div>");
      $("div#main").append("<div class='main-right'><h2>" + formatedContent["items"][i + 1]["full_name"] + "</h2>" + "<b>" + formatedContent["items"][i + 1]["description"] + "</b></div>");
    }
  });
}

$("#btnSearch").click(function () {
  searchType = $("#searchText").val();
  console.log(searchType);
  queryAjax();
});