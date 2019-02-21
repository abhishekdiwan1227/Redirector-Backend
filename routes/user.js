var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.route("/login").post(userController.getOne);

router.route("/register").post(userController.addOne);

router.route("/validate/:token").get(userController.validateUser);

router.route("/register/thirdparty").post(userController.thirdPartyUser);

module.exports = router;
