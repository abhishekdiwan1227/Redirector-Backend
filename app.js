var express = require("express");
var app = express()
var bodyParser = require("body-parser");
var userRoutes = require('./routes/user');
var searchRoutes = require('./routes/search')

var db = require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

var router = express.Router();

app.get("/", (req, res) => {
    res.status(200).json("Server running at port " + port);
});

app.use('/api/user', userRoutes);
app.use('/api/search', searchRoutes);

var port = process.env.PORT || 8080;

app.listen(port, () => {
console.log("Server Running");
});