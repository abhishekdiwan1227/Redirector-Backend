var mongoose = require('mongoose');

mongoose.connect(
    "mongodb://abhishek_test:3UZvuhyhBgvUne5@cluster0-shard-00-00-eeazd.mongodb.net:27017,cluster0-shard-00-01-eeazd.mongodb.net:27017,cluster0-shard-00-02-eeazd.mongodb.net:27017/redirector?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to DB'));
db.once('open', function () {
    console.log("Connected to MongoDB database")
});

module.exports = db;