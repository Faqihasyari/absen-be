const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meeting.controller")

// ngebuat meeting hanya bisa admin
router.post("/", meetingsController.createrMeetings)

// get untuk menampilkan history rapat
router.get("/", meetingsController.getMeetings)

// detail rapat untuk melihat kehadiran di rapat
router.get("/:id", meetingsController.getMeetingsDetail);
module.exports = router;