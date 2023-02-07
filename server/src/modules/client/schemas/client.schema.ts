import Joi from 'joi';

const clientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required()
});

export default clientSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
