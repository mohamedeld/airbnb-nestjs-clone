import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { OtpRepository } from './repositories/otp.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { SendOtpUseCase } from './usecases/send-otp.usecase';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { FindOtpRawUseCase } from './usecases/find-otp-raw.usecase';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    UsersModule,
    MailModule,
  ],
  providers: [
    OtpService,
    OtpRepository,
    CustomI18nService,
    SendOtpUseCase,
    FindOtpRawUseCase,
    VerifyOtpUseCase,
  ],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
