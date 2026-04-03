const service = require("./payment.service");
const Plan = require("../plan/plan.model");
const { success } = require("../../utils/response");

exports.createCheckout = async (req, res, next) => {
  try {
    const { company_id, plan_id } = req.body;

    const plan = await Plan.findById(plan_id);

    if (!plan) throw new Error("Plan not found");

    const url = await service.createCheckoutSession({
      company_id,
      plan,
    });

    return success(res, { checkout_url: url });

  } catch (e) {
    next(e);
  }
};