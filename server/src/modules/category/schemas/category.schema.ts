import Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required()
});

export default categorySchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
