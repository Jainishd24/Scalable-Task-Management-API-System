const Joi = require("joi");

exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user").required(),
  company: Joi.string().required()
});

exports.updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().valid("admin", "user")
});