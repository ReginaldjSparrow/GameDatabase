const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//Define Database URL

const dbURL = process.env.DB_URI || "mongodb://localhost";

var services = function(app) {
    app.post('/writeinfo', function(req, res) {
        var gameTitle = req.body.gameTitle;
        var gameConsole = req.body.gameConsole;
        var category = req.body.category;
        var esrb = req.body.esrb;
        var rating = req.body.rating;
        var review = req.body.review;

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else {
                var dbo = client.db("gamedatabase");

                var search = {title: gameTitle};
                dbo.collection("games").find(search).toArray(function(err, data) {
                    if(err) {
                        return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                    } else {
                        if(data.length >0) {
                            return res.status(200).send(JSON.stringify({msg: "Game Already Exists"}));
                        } else {
                            var newGame = {
                                gameTitle: gameTitle,
                                gameConsole: gameConsole,
                                category: category,
                                esrb: esrb,
                                rating: rating,
                                review: review
                            };
                            dbo.collection("games").insertOne(newGame, function(err) {
                                if(err) {
                                    return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                                } else {
                                    return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                                }
                            });
                        }
                    }
                });
            }
        });

    });

    app.get('/getinfo', function(req, res) {

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function(err, client) {
            if(err) {
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else {
                var dbo = client.db("gamedatabase");

                dbo.collection("games").find().toArray(function(err, data) {
                    if(err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                    } else{
                        client.close();
                        console.log(data);
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS", gameDatabase:data}));
                    }
                });
            }
        });
    });

    app.get("/getinfoByGameConsole", function(req, res) {
        var gameConsole = req.query.gameConsole;
        var search = (gameConsole === "") ? { }:{gameConsole: req.query.gameConsole};

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else {
                var dbo = client.db("gamedatabase");

                dbo.collection("games").find(search).toArray(function(err, data) {
                    if(err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                    } else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS", gameDatabase:data}));
                    }
                });
            }
        });
    });

    app.put('/updateinfo', function(req, res) {
        var gameID = req.body.gameID;
        var gameTitle = req.body.gameTitle;
        var gameConsole = req.body.gameConsole;
        var category = req.body.category;
        var esrb = req.body.esrb;
        var rating = req.body.rating;
        var review = req.body.review;
        var g_id = new ObjectId(gameID);
        var search = {_id: g_id};
        var updateData = {
            $set: {
                gameTitle: gameTitle,
                gameConsole: gameConsole,
                category: category,
                esrb: esrb,
                rating: rating,
                review: review
            }
        }

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else {
                var dbo = client.db("gamedatabase");

                dbo.collection("games").updateOne(search, updateData, function(err) {
                    if(err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                    } else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }
                });
            }
        });
    });

    app.delete('/deleteinfo', function(req, res) {
        var gameID = req.query.gameID;
        var g_id = new ObjectId(gameID);
        search = {_id: g_id};
console.log(gameID);
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err) {
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else {
                var dbo = client.db("gamedatabase");

                dbo.collection("games").deleteOne(search, function(err) {
                    if(err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({msg: "Error" + err}));
                    } else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }
                });
            }
        });
    });
}
  

module.exports = services;