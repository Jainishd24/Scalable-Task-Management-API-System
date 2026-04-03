const express = require("express");
const router = express.Router();
const companyController = require("./company.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const { authorizeRoles } = require("../../middlewares/rbac.middleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("super-admin"),
  companyController.createCompany
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("super-admin"),
  companyController.listCompanies
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("super-admin"),
  companyController.updateCompany
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("super-admin"),
  companyController.deleteCompany
);

module.exports = router;