import Joi from 'joi';

const loginCompanySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export default loginCompanySchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
