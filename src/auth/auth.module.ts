import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IEnvironment } from 'src/common/configration/environment.interface';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<IEnvironment>) => {
        return {
          secret: configService.getOrThrow('jwtSecret'),
          signOptions: {
            expiresIn: configService.getOrThrow('accessTokenExpiration'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, CustomI18nService],
  controllers: [AuthController],
})
export class AuthModule {}
