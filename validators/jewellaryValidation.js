import Joi from "joi";

export const jewelleryValidation = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
  shortDescription: Joi.string().trim().min(30).max(70).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 50 characters",
    "string.max": "Description must be at max 70 characters",
    "any.required": "Description is required",
  }),
  description: Joi.string().trim().min(300).max(400).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 300 characters",
    "string.max": "Description must be at max 500 characters",
    "any.required": "Description is required",
  }),

  category: Joi.string()
    .valid(
      "Necklace",
      "Ring",
      "Earring",
      "Bracelet",
      "Anklet",
      "Pendant",
      "Chain",
      "Other",
    )
    .required()
    .messages({
      "any.only": "Category is required",
      "string.empty": "Category is required",
      "any.required": "Category is required",
    }),

  gender: Joi.string().valid("Men", "Women", "Unisex").required().messages({
    "any.only": "Gender must be Men, Women, or Unisex",
    "string.empty": "Gender is required",
    "any.required": "Gender is required",
  }),

  metalType: Joi.string()
    .valid("Gold", "Silver", "Platinum", "Diamond", "Artificial", "Other")
    .required()
    .messages({
      "any.only": "Metal type is required",
      "string.empty": "Metal type is required",
      "any.required": "Metal type is required",
    }),
  purity: Joi.string()
    .valid("22K", "18K", "925 Silver", "14K", "18 & 22K")
    .required()
    .messages({
      "any.only": "Purity is required",
      "string.empty": "Purity is required",
      "any.required": "Purity is required",
    }),
  stoneType: Joi.string()
    .valid("Diamond", "Ruby", "Emerald", "Kundan", "Others")
    .required()
    .messages({
      "any.only": "Stone type is required",
      "string.empty": "Stone type is required",
      "any.required": "Stone type is required",
    }),
});
