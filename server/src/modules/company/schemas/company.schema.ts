import Joi from 'joi';

const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export default companySchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
