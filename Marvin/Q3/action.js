

$(function(){
    $("#SearchButton").click( function(){
        var searchcontent = $("#SearchContent").val();
        if(searchcontent === '')
        {
            alert('Please input some string');
            return;
        }

        $(".content").empty();
        $('#SearchContent').attr("disabled","true");
        $("#SearchButton").attr('disabled',"true");

        $.ajax({
            url:'https://api.github.com/search/repositories?q='+ searchcontent,
            type:'Get',
            async:true,
            dataType:'json',
            success: function(data,textStatus,jqXHR){
                var DataArray = new Array();
                    var resultArray = data.items;
                    $.each(resultArray, function (index, item) {  
                        if( index >=10)
                            return false;
                        var text = "<div class='panel-heading'><h3 class='panel-title'>"+resultArray[index].full_name+
                        "</h3></div><div class='panel-body'>"+resultArray[index].description+"</div>";

                        text = "<div class='panel panel-primary' >"+text+"</div>";       
                        $(".content").append(text);
                });

                $("#SearchContent").removeAttr("disabled");
                $("#SearchButton").removeAttr("disabled");

            }
        });

    });
});