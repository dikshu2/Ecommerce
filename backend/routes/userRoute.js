const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const { registerUser, login, logout } = require("../controller/userController");

router.route("/").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post( logout);

module.exports = router;
