export interface IEnvironment {
  port: number;
  fullbackLang: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  systemAdmin: ISystemAdmin;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
