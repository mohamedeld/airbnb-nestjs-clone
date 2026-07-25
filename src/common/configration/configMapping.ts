import { developmentEnv } from './environment-modes/development.env';
import { productionEnv } from './environment-modes/production.env';
import { stagingEnv } from './environment-modes/staging.env';
import { IEnvironment } from './environment.interface';

const environments = {
  development: developmentEnv,
  production: productionEnv,
  staging: stagingEnv,
};

type EnvironmentName = keyof typeof environments;

export default (): IEnvironment => {
  const env = (process.env.NODE_ENV ?? 'development') as EnvironmentName;
  const envConfig = environments[env];
  if (!envConfig) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return envConfig();
};
