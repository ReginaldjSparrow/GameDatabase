usewhenneeded();


function usewhenneeded(){
$.ajax({
    url:"http://localhost:3000/getinfo",
    type: 'get',
    success: function(responce) {
        console.log(responce);   
        var returnData = JSON.parse(responce);

       if(returnData.msg === "SUCCESS") {
           displaytable(returnData.gameDatabase);
       } else {
           console.log(responce)
       }
   },
   error: function(responce) {
       console.log(responce);
   }
});
}


function displaytable(dataarray) {
    var htmlString = "";
        for(i=0; i < dataarray.length; i++) {
            htmlString += "<tr>";
                htmlString += "<td>";
                    htmlString += dataarray[i].gameTitle;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += dataarray[i].console;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += dataarray[i].category;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += dataarray[i].esrb;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += dataarray[i].rating;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += dataarray[i].review;
                htmlString += "</td>";
                htmlString += "<td>";
                    htmlString += "<button class='delete-button' data-id='" + dataarray[i].id + "'>Erase</button>"
                htmlString += "</td>";
            htmlString += "</tr>";
        }

        $("#tablebody").html(htmlString);
        deleteButtonFunc();
}

function deleteButtonFunc() {
    $('.delete-button').click(function() {
        var gameID = this.getAttribute('data-id');
        $.ajax({
            url:"http://localhost:3000/deleteinfo",
            type: 'delete',
            data: {id: gameID},
            success: function(responce) {
                var returnData = JSON.parse(responce);

            if(returnData.msg === "SUCCESS") {
                usewhenneeded();
            } else {
                console.log(responce)
            }
        },
        error: function(responce) {
            console.log(responce);
        }
    });
    });
}