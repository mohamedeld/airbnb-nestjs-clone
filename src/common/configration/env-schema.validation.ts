import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().integer().default(4000),
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
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().integer().required(),
  SMTP_SERVICE: Joi.string().required(),
  SMTP_AUTH_EMAIL: Joi.string().email().required(),
  SMTP_AUTH_PASSWORD: Joi.string().required(),
  SMTP_SECURE: Joi.boolean().required(),
});
