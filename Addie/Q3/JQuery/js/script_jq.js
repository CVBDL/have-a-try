'use strict'

$(document).ready(function () {

	$(':input[type="button"]').click(function () {
		
		$('.repoContainer').remove();
		
		var searchValue = $(':input[type="search"]').val();
		if (searchValue === undefined || searchValue === null) {
			alert("Please input search value");
			return;
		}
       
		var url = "https://api.github.com/search/repositories?q=" + searchValue;
		
		$.get(url, function (data) {
			for (var i = 0; i < 10; i++) {
				$('.Container').append('<div class="repoContainer"></div>');
				$('.repoContainer:last-child').append('<div class="repo"></div>');
				var repoName = '<div>' + data.items[i].full_name + "</div>";
				var repoDiscrip = "<div>" + data.items[i].description + "</div>"
				$(".repoContainer:last-child>div").append(repoName);
				$(".repoContainer:last-child>div").append(repoDiscrip);
			}
		});
	});
});

