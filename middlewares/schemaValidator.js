const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
});

const loginSchema = Joi.object({
   password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
