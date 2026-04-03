const router = require("express").Router();
const controller = require("./activity.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/:taskId", auth, controller.getTaskActivity);

module.exports = router;