const Joi = require("joi");

exports.createPlanSchema = Joi.object({
  name: Joi.string().required(),
  maxUsers: Joi.number().required(),
  maxProjects: Joi.number().required(),
  duration: Joi.number().required(),
  price: Joi.number().required()
});

exports.updatePlanSchema = Joi.object({
  name: Joi.string(),
  maxUsers: Joi.number(),
  maxProjects: Joi.number(),
  duration: Joi.number(),
  price: Joi.number()
});