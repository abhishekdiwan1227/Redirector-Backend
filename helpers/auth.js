var jwt = require("jsonwebtoken");
var userModel = require("../models/userModel");
var mongoose = require("mongoose");
var config = require("../config/keys");

module.exports.verifyToken = (token) => {
    return jwt.verify(token, config.secrets.jwt);
};

module.exports.signToken = (user) => {
    return jwt.sign({ user: user },
        config.secrets.jwt,
        {expiresIn: config.secrets.expiration}
    );
};

module.exports.checkScope = (userId, userRoleId) => {
    userModel.findById(userId)
    .exec()
    .then(result => {
       if(result.roleId == userRoleId) return true;
       return false;
    })
    .catch(err => {
        console.log(err);
    })
}