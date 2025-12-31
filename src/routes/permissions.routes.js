const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissions.controller");

router.post("/", permissionController.createPermission);
router.get("/", permissionController.getPermissions);
router.put("/:id", permissionController.updatePermissionStatus);

module.exports = router;