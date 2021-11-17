const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

var server;
var port = process.env.PORT || process.env.NODE_PORT || 3000;

//Router
var router = require("./router.js");
router(app);
//Data Processes
var services = require('./services.js');
services(app);
//Listen
server = app.listen(port, function(err) {
    if(err) {
        throw err;
    }

    console.log("listening on Port " + port);
});