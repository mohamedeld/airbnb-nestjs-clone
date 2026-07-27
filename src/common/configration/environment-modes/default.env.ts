import { IEnvironment } from '../environment.interface';

export const defaultEnv = (): IEnvironment => ({
  port: Number(process.env.PORT),
  fullbackLang: process.env.FULLBACK_LANG as string,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION as string,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION as string,
});
