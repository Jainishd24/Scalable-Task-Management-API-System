const router = require("express").Router();
const controller = require("./task.controller");

router.post("/", controller.createTask);

module.exports = router;