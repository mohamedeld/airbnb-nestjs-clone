import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().integer().default(3000),
  NODE_ENV: Joi.string().required(),
  FULLBACK_LANG: Joi.string().default('en'),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().default('7d'),
  REFRESH_TOKEN_EXPIRATION: Joi.string().default('7d'),
  SYSTEM_ADMIN: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  BUCKET_NAME: Joi.string().required(),
  MINIO_ENDPOINT: Joi.string().uri().required(),
});
