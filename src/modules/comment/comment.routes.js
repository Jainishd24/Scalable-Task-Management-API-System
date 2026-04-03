const router = require("express").Router();
const controller = require("./comment.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/", auth, controller.addComment);
router.get("/:taskId", auth, controller.getComments);
router.delete("/:id", auth, controller.deleteComment);

module.exports = router;