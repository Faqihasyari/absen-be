const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// login user
router.post("/login", authController.login);

module.exports = router;