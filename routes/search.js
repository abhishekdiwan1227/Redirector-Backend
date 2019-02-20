var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.route("/user/:userId").put(userController.addOneSearchRoute);

router.route("/history/:userId").get(userController.getSearchHistory);



module.exports = router;
