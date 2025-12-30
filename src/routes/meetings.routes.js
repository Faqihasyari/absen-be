const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meeting.controller")

router.post("/", meetingsController.createrMeetings)

module.exports = router;