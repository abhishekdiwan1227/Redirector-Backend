var auth = require('../helpers/auth')
var userModel = require("../models/userModel");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

module.exports.getOne = (req, res, next) => {
    userModel.findOne({ email: req.body.email })
        .exec()
        .then(result => {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    var tokenObj = {
                        name: result.name,
                        email: result.email,
                        id: result._id
                    }
                    var token = auth.signToken(tokenObj);
                    res.json({ token: token, user: result });
                }
                else {
                    res.json("Invalid Password");
                }
            }
            else {
                res.json("No user found");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(501).json("Failed");
        });
};

module.exports.addOne = (req, res, next) => {
    var user = new userModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    user.save()
        .then(result => {
            res.status(200).json("New User Added");
        })
        .catch(err => {
            res.json(err);
        })
}

module.exports.validateUser = (req, res, next) => {
    var tokenPayload = auth.verifyToken(req.params.token);
    if (tokenPayload.user) {
        res.status(200).json({ user: tokenPayload.user })
    }
    else {
        res.status(501);
    }
}

module.exports.addOneSearchRoute = (req, res, next) => {
    var regex = /:\/\/(.[^/]+)/
    var matchGroups = regex.exec(req.body.url)
    var domainName = matchGroups[1].replace("www.", "").replace(".com", "");
    var userId = mongoose.Types.ObjectId(req.params.userId);
    var navigatedUrl = {
        key: domainName,
        url: req.body.url
    }
    userModel.findOneAndUpdate(
        { _id: userId },
        { $push: { navigatedUrls: navigatedUrl } },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(500).json("Failed")
            }
            res.status(200).json(doc);
        }
    )
}

module.exports.getSearchHistory = (req, res, next) => {
    var userId = mongoose.Types.ObjectId(req.params.userId);
    userModel.findOne({ _id: userId })
        .exec()
        .then(result => {
            res.status(200).json(result.navigatedUrls);
        })
        .catch(error => {
            res.json("Failed");
        })
}