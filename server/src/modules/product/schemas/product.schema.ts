import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.object({ id: Number }).required()
});

export default productSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
