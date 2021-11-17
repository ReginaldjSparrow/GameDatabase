const path = require("path");

var router = function(app) {
    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/homegamepage.html"))
    });

    app.get('/insertform', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/writegame.html"))
    });

    app.get('/retrieve', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/retrieveinfo.html"))
    });

};

module.exports = router;