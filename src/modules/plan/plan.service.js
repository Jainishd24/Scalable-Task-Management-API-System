const Plan = require("./plan.model");

exports.createPlan = async (data) => {
  const existing = await Plan.findOne({ name: data.name });
  if (existing) {
    throw { statusCode: 400, message: "Plan already exists" };
  }

  return await Plan.create(data);
};

exports.updatePlan = async (id, data) => {
  const plan = await Plan.findByIdAndUpdate(id, data, { new: true });

  if (!plan) {
    throw { statusCode: 404, message: "Plan not found" };
  }

  return plan;
};

exports.deletePlan = async (id) => {
  const plan = await Plan.findByIdAndDelete(id);

  if (!plan) {
    throw { statusCode: 404, message: "Plan not found" };
  }

  return plan;
};

exports.listPlans = async () => {
  return await Plan.find();
};