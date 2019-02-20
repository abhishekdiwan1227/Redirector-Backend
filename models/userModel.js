var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var brcypt = require("bcryptjs");

var UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String
    },
    navigatedUrls: [{
        key: {
            type: String
        },
        url: {
            type: String
        }
    }]
});

module.exports = mongoose.model('user', UserSchema)