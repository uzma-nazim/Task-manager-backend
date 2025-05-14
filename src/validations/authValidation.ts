import Joi from 'joi';

// Validation schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).required()
});

// Validation schema for user login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// Validation schema for refresh token
const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
});

export {
  registerSchema,
  loginSchema,
  refreshTokenSchema
}; 