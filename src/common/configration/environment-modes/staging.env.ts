import { IEnvironment } from '../environment.interface';
import { defaultEnv } from './default.env';

export const stagingEnv = (): IEnvironment => ({
  ...defaultEnv(),
});
