const express = require("express");
const { userLogin, test } = require("../controller/Login");

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/").get(test);

module.exports = router;
