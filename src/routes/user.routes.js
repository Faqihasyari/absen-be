const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");
const { validateBody } = require("../middlewares/validateBody");

router.post("/",auth, validateBody(["meeting_id", "alasan"]) ,userController.createUser);

module.exports = router;