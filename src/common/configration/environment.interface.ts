export interface IEnvironment {
  port: number;
  fullbackLang: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}
