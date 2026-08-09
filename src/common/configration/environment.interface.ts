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
  smtpHost: string;
  smtpPort: number;
  smtpService: string;
  smtpAuthEmail: string;
  smtpAuthPassword: string;
  smtpSecure: boolean;
}

export interface ISystemAdmin {
  name: string;
  email: string;
  password: string;
}
