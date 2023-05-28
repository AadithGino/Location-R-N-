const express = require("express");
const { userSignUp } = require("../controller/SignUp");

const router = express.Router();

router.route("/signup").post(userSignUp)

module.exports = router;
