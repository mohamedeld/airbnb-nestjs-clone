import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { envSchema } from './common/configration/env-schema.validation';
import configMapping from './common/configration/configMapping';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './common/errors-handling/custom-exception.filter';
import { IEnvironment } from './common/configration/environment.interface';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { SystemAdminsModule } from './system-admins/system-admins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<IEnvironment>) => ({
        uri: configService.getOrThrow<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<IEnvironment>) => ({
        fallbackLanguage: configService.getOrThrow('fullbackLang'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    CountriesModule,
    CitiesModule,
    CurrenciesModule,
    UnitCategoriesModule,
    AppSettingsModule,
    SystemAdminsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
