import { registerAs } from '@nestjs/config';
import Joi = require('joi');

const DEFAULT_PORT = 3000;

export interface AppConfig {
  port: number;
  host: string;
  db: {
    username: string;
    password: string;
    name: string;
    host: string;
    port: number;
    authSource: string;
  };
}

const validationSchema = Joi.object({
  port: Joi.number().port().required(),
  host: Joi.string().required(),
  db: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().port().required(),
    authSource: Joi.string().required(),
  }).required(),
});

const validateConfig = (config: AppConfig) => {
  const error = validationSchema.validate(config).error;
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};

const getConfig = (): AppConfig => {
  const config: AppConfig = {
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    host: process.env.HOST,
    db: {
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      name: process.env.MONGODB_DATABASE,
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      authSource: process.env.MONGODB_AUTH_SOURCE,
    },
  };

  validateConfig(config);
  return config;
};

export default registerAs('app', getConfig);
