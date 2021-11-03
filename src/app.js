const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

var server;
var port = process.env.PORT || process.env.NODE_PORT || 5000;

//Router

//Data Processes

//Listen
server = app.listen(port, function(err) {
    if(err) {
        throw err;
    }

    console.log("listening on Port " + port);
});