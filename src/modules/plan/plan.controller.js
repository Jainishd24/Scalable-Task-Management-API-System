const planService = require("./plan.service");
const { successResponse } = require("../../utils/response");
const {
  createPlanSchema,
  updatePlanSchema
} = require("./plan.validation");

exports.createPlan = async (req, res, next) => {
  try {
    const { error } = createPlanSchema.validate(req.body);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const plan = await planService.createPlan(req.body);

    return successResponse(res, 201, "Plan created successfully", plan);
  } catch (err) {
    next(err);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const { error } = updatePlanSchema.validate(req.body);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const plan = await planService.updatePlan(req.params.id, req.body);

    return successResponse(res, 200, "Plan updated successfully", plan);
  } catch (err) {
    next(err);
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    await planService.deletePlan(req.params.id);

    return successResponse(res, 200, "Plan deleted successfully");
  } catch (err) {
    next(err);
  }
};

exports.listPlans = async (req, res, next) => {
  try {
    const plans = await planService.listPlans();

    return successResponse(res, 200, "Plans fetched successfully", plans);
  } catch (err) {
    next(err);
  }
};