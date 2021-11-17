$('#data-submit').click(function() {
    var gameData = {
        gameTitle: $('#gameTitle').val(),
        console: $('#console').val(),
        category: $('#category').val(),
        esrb: $('#esrb').val(),
        rating: $('#rating').val(),
        review: $('#review').val()
    };
    
    console.log("Hello World");
    console.log("Data: " + JSON.stringify(gameData));
    var urlpath = "http://localhost:3000/writeinfo";
    console.log(urlpath);
     $.ajax({
         url: urlpath,
         type: 'post',
         data: gameData,
         success: function(responce) {
             var returnData = JSON.parse(responce);

            if(returnData.msg === "SUCCESS") {
                alert("SUCCESS");
            } else {
                console.log(responce)
            }
        },
        error: function(responce) {
            console.log(responce);
        }
    });

});