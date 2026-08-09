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
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
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
import { AuthGuard } from './auth/guards/auth.guard.guard';
import { CustomI18nService } from './i18n/custom-i18n.service';
import { RolesGuard } from './auth/guards/roles.guard';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { UnitsModule } from './units/units.module';
import { BookingsModule } from './bookings/bookings.module';
import { UnitReviewsModule } from './unit-reviews/unit-reviews.module';
import { UnitFavoritesModule } from './unit-favorites/unit-favorites.module';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';

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
    FilesUploadModule,
    UnitsModule,
    BookingsModule,
    UnitReviewsModule,
    UnitFavoritesModule,
    MailModule,
    OtpModule,
  ],
  controllers: [],
  providers: [
    CustomI18nService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
