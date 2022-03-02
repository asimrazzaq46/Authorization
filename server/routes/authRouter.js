const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

const { loginUser, logutUser } = require("../controllers/auth");

router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logutUser);

module.exports = router;
