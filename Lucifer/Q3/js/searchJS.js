var queryText = "javascript";

function loadHTML(){
	$("#userQuery").attr("value","javascript");
	testRead("javascript");
}

function startQuery(){
	var query = $("#userQuery").val();
	testRead(query);
}

function testRead(query) {
	$("#resText").empty();
	var html = "";
	$.ajax({
		type: 'get',
		dataType: 'json',
		url: 'https://api.github.com/search/repositories?q=' + query, 
		beforeSend: function () { console.log('loading...') },
		success: function (data) {
			for (i = 0; i < 10; i += 2) {
				html += '<div class="row">';
				html += '<div class="left">';
				html += '<h2>' + data.items[i].full_name + '</h2>';
				html += '<br>';
				html += '<h4>' + data.items[i].description + '</h4>';
				html += '</div>';
	
				html += '<div class="right">';
				html += '<h2>' + data.items[i + 1].full_name + '</h3>';
				html += '<br>';
				html += '<h4>' + data.items[i + 1].description + '</h4>';
				html += '</div>';
				html += '</div>';
			}
			$("#resText").append($(html));
		},
		complete: function () { console.log('mission acomplete.') },
		error: function () { console.log('Loading failed') }
	});
}