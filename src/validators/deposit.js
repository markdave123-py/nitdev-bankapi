import joi from "joi";

export const depositSchema = joi.object({
  amount: joi.number().greater(0).required(),
  currency: joi.string().max(3).valid("NGN", "USD", "ngn", "usd").required()
});
