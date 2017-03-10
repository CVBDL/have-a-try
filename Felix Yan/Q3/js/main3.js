//jQuery.ajaxSetup({async:false});

var items = null;
var showItemsCount = 10;

var createSearchItems = function(){
	var htmlStr = "";
	
	for(var i=0; i < showItemsCount; i++){
		if(items == null)
			break;

		if(items[i] == null)
			continue;

		htmlStr += '<div class="col-md-6 col-sm-12">';
		htmlStr += '  <div class="wrapper">';
		htmlStr += '    <div class="repo_name row">';
		htmlStr += '      <div class="col-sm-3 col-md-2">';
		htmlStr += '        <h5><strong>Name:</strong></h5>';
		htmlStr += '      </div>';
		htmlStr += '      <div class="col-sm-9 col-md-10 name">'
		htmlStr += '        <h5>';
		htmlStr += items[i].full_name;
		htmlStr += '        </h5>';
		htmlStr += '      </div>';
		htmlStr += '    </div>';
		htmlStr += '    <div class="row">';
		htmlStr += '      <div class="col-sm-3 col-md-2">';
		htmlStr += '        <h6><strong>Description:</strong></h6>';
		htmlStr += '      </div>';
		htmlStr += '      <div class="col-sm-9 col-md-10 description">';
		htmlStr += '        <h6>';
		htmlStr += items[i].description;
		htmlStr += '        </h6>';
		htmlStr += '      </div>';
		htmlStr += '    </div>';
		htmlStr += '  </div>';
		htmlStr += '</div>';

		if(i%2 == 1)
			htmlStr += '<div class="clearfix"></div>';
	}
	$(".searchResult").html(htmlStr);
}

var doSearch = function(){
	var searchInput = $("#inputSuccess");
	var searchStr = searchInput.val() === undefined? "javascript" : searchInput.val();

	$.get("https://api.github.com/search/repositories?q=" + searchStr, function(result){
		items = result.items;
		
	$(".searchResult").hide();
		createSearchItems();
	$(".searchResult").show(1000);
	});
}

var updateItemsShownCount = function(event, count){
	$(".show_items_count .btn").removeClass("btn_highlight");
	$(event.target).addClass("btn_highlight");
	showItemsCount = count;
	createSearchItems();
}

doSearch();
