import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .optional()
    .default("production"),
  MONGO_URI: Joi.string().required().label("Mongo DB url"),
  PORT: Joi.number().default(5000).optional(),
}).unknown()

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
