const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const { authorizeRoles } = require("../../middlewares/rbac.middleware");

// 🔥 Only ADMIN (and optionally SUPER-ADMIN)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "super-admin"), // ✅ FIXED
  userController.createUser
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "super-admin"), // ✅ FIXED
  userController.listUsers
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"), // ✅ FIXED
  userController.deleteUser
);

module.exports = router;