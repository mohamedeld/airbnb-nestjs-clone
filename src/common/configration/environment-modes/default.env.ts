import { IEnvironment } from '../environment.interface';

export const defaultEnv = (): IEnvironment => ({
  port: Number(process.env.PORT),
});
