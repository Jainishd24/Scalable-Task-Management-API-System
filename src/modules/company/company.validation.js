const Joi = require("joi");

exports.createCompanySchema = Joi.object({
  name: Joi.string().required(),
  subscriptionPlan: Joi.string().required()
});

exports.updateCompanySchema = Joi.object({
  name: Joi.string(),
  subscriptionPlan: Joi.string(),
  planExpiry: Joi.date()
});