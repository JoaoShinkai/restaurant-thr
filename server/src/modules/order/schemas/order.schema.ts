import Joi from 'joi';

const orderSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      quantity: Joi.number().required(),
      amount: Joi.number().required(),
      product: Joi.object({ id: Number }).required()
    })
  ),
  client: Joi.object({ id: Number }).required()
});

export default orderSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
