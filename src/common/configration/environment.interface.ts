export interface IEnvironment {
  port: number;
  fullbackLang: string;
  mongoUri: string;
  jwtSecret: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  systemAdmin: ISystemAdmin;
  region: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  bucketName: string;
  minioEndpoint: string;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
