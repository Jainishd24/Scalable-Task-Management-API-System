const router = require("express").Router();
const controller = require("./payment.controller");

router.post("/create-checkout", controller.createCheckout);

module.exports = router;