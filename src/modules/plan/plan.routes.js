const express = require("express");
const router = express.Router();
const planController = require("./plan.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const { authorizeRoles } = require("../../middlewares/rbac.middleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("super-admin"),
  planController.createPlan
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("super-admin"),
  planController.listPlans
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("super-admin"),
  planController.updatePlan
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("super-admin"),
  planController.deletePlan
);

module.exports = router;