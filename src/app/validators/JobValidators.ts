import * as joi from "joi";

export const createJobValidator = joi.object({
  priceInPence: joi.number().integer().min(0).required(),
  type: joi.string().valid("ON_DEMAND", "SHIFT", "SCHEDULED").required(),
  status: joi.string().valid("AVAILABLE", "ASSIGNED", "COMPLETED").required(),
  contactEmail: joi.string().email().optional(),
});

export const updateJobValidator = joi.object({
  status: joi.string().valid("AVAILABLE", "ASSIGNED", "COMPLETED").required(),
  contactEmail: joi.string().email().optional(),
});

export const idValidator = joi.object({
  id: joi.string().uuid({ version: "uuidv4" }).required(),
});
