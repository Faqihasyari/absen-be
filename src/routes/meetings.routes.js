const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meeting.controller");
const { auth } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
const { validateBody } = require("../middlewares/validateBody");

// ngebuat meeting hanya bisa admin
// router.post("/", meetingsController.createrMeetings)
router.post("/", auth, isAdmin, validateBody(["nama_rapat", "creatorId"]) ,meetingsController.createrMeetings)

// get untuk menampilkan history rapat
router.get("/", meetingsController.getMeetings)

// detail rapat untuk melihat kehadiran di rapat
router.get("/:id", meetingsController.getMeetingsDetail);

// edit rapat
router.patch("/:id/status", meetingsController.updateStatus);


module.exports = router;