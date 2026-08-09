import { Module } from '@nestjs/common';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordRepository } from './repositories/forget-password.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ForgetPassword,
  ForgetPasswordSchema,
} from './schema/forget-password.schema';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { SendForgetPasswordOtpUseCase } from './usecases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUseCase } from './usecases/verify-forget-password.usecase';
import { ResetForgetPasswordUseCase } from './usecases/reset-forget-password.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ForgetPassword.name, schema: ForgetPasswordSchema },
    ]),
    MailModule,
    UsersModule,
  ],
  controllers: [ForgetPasswordController],
  providers: [
    ForgetPasswordService,
    ForgetPasswordRepository,
    SendForgetPasswordOtpUseCase,
    VerifyForgetPasswordOtpUseCase,
    ResetForgetPasswordUseCase,
    CustomI18nService,
  ],
})
export class ForgetPasswordModule {}
