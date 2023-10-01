const express = require("express");
const { login, loginWithToken, register, logout } = require("./controller");

const router = express.Router();

router.post("/login", login);
router.post("/loginWithToken", loginWithToken);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
