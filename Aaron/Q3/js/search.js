'use strict'

$(document).ready(function() {
  $("#myForm").on("submit", function(ev) {
    ev.preventDefault();
  });
});

function clicksearch() {
  $.ajax({
    type: "GET",
    url: "https://api.github.com/search/repositories?q=" + $("#searchbox").val(),
    dataType: 'json',
    success: function(msg) {
      $("#myDiv").html("<h2>Top 10 repositories!</h2>");
      var htmlstr = ""
      for(var i = 0; i < 10; i++) {
        htmlstr += '<div class="row" id="' + i + '"></div>'
      }
      $("#repo_list").html(htmlstr);
      $(".row").each(function(i) {
        $(this).html(msg.items[i].full_name + "<br>" + msg.items[i].description);
      });
    },
    error: function(data, status, e) {
      alert("error");
    }
  });
}