const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes"));
router.use("/meetings", require("./meetings.routes"));
// router.use("/attendance", require("./attendance.routes"));
router.use("/attendance", require("./attendance.routes"));
router.use("/permissions", require("./permissions.routes"));


module.exports = router;
