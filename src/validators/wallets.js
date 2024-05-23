import joi from 'joi';


export const walletSchema = joi.object({
    currency: joi.string().max(3).valid('NGN', 'USD', 'ngn', 'usd').required(),
})