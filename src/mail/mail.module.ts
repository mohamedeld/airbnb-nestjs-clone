import { Module } from '@nestjs/common';
import { NodemailerEmailAdapter } from './adapters/nodemailer-email.adapter';
import { MailService } from './mail.service';
import { EMAIL_ADAPTER } from './constants/mail.constant';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { MailController } from './mail.controller';

@Module({
  providers: [
    MailService,
    {
      provide: EMAIL_ADAPTER,
      useClass: NodemailerEmailAdapter,
    },
    CustomI18nService,
  ],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
