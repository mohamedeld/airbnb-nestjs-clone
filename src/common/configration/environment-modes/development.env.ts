import { IEnvironment } from '../environment.interface';
import { defaultEnv } from './default.env';

export const developmentEnv = (): IEnvironment => ({
  ...defaultEnv(),
});
