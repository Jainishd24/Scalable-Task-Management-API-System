const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/register-super-admin", authController.registerSuperAdmin);
router.post("/login", authController.login);

module.exports = router;