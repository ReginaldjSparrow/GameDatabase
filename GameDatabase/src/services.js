const fs = require('fs');

const FILENAME = './files/library.txt';

var services = function(app) {
    app.post('/writeinfo', function(req, res) {
        var id = "game" + Date.now();
        var gameData = {
            id: id,
            gameTitle: req.body.gameTitle,
            console: req.body.console,
            category: req.body.category,
            esbr: req.body.esbr,
            rating: req.body.rating,
            review: req.body.review,
        }

        console.log("Data: " + JSON.stringify(gameData));

        var libraryData = [];

        if(fs.existsSync(FILENAME)) {
            fs.readFile(FILENAME, "utf8", function(err, data) {
               if(err) {
                    res.send(JSON.stringify({msg: err}));
               } else {
                   libraryData = JSON.parse(data);

                   libraryData.push(gameData);
               
                   fs.writeFile(FILENAME, JSON.stringify(libraryData), function(err) {
                        if(err) {
                            res.send(JSON.stringify({msg: err}));
                        } else {
                            res.send(JSON.stringify({msg: "SUCCESS"}))
                        }
                
                    });
                }
            });
        } else {
            libraryData.push(gameData);

            fs.writeFile(FILENAME, JSON.stringify(libraryData), function(err) {
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    res.send(JSON.stringify({msg: "SUCCESS"}))
                }
        
            });
        }
    });

    app.get('/getinfo', function(req, res) {
        if(fs.existsSync(FILENAME)) {
            fs.readFile(FILENAME, "utf8", function(err, data) {
               if(err) {
                    res.send(JSON.stringify({msg: err}));
               } else {
                   libraryData = JSON.parse(data);
                   console.log(JSON.stringify(libraryData));              
                     res.send(JSON.stringify({msg: "SUCCESS", gameDatabase: libraryData}));                      
                }
            });
        } else {
            blankArray=[];
            res.send(JSON.stringify({msg: "SUCCESS", gameDatabase: blankArray}));
        }
    });

    app.delete('/deleteinfo',function(req, res) {
        fs.readFile(FILENAME, "utf8", function(err, data) {
            if(err) {
                 res.send(JSON.stringify({msg: err}));
            } else {
                libraryData = JSON.parse(data);
                const gamearray = [data];
                var id = gamearray.indexOf("id");
                for(i=0; i<id; i++) {
                    if (i != id) {
                        i++
                    } else if (i == id) {
                        gamearray.splice(indexOf(i), 1);
                    }
                }
                console.log(gamearray);
                fs.writeFile(FILENAME, JSON.stringify(libraryData), function(err) {
                     if(err) {
                         res.send(JSON.stringify({msg: err}));
                     } else {
                         res.send(JSON.stringify({msg: "SUCCESS"}))
                     }
             
                 });
             }
         });
    });
}
  

module.exports = services;