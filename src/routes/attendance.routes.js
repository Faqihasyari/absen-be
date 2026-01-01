const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { validateBody } = require("../middlewares/errorHandler");

// router scan
router.post("/scan", validateBody(["qr_token", "meeting_id"]) ,attendanceController.scanAttendance);

module.exports = router;