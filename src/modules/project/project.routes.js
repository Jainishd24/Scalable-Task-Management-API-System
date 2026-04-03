    const router = require("express").Router();
    const controller = require("./project.controller");

    const auth = require("../../middlewares/auth.middleware");
    const { authorizeRoles } = require("../../middlewares/rbac.middleware");

    // 🔥 Only ADMIN can manage projects
    router.post("/", auth, authorizeRoles("admin"), controller.createProject);
    router.get("/", auth, authorizeRoles("admin"), controller.getProjects);

    // 🔥 Users can only see assigned projects
    router.get("/my-projects", auth, authorizeRoles("user"), controller.getUserProjects);

    module.exports = router;