import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { IEmailAdapter } from './interfaces/email-adapter-contract.interface';
import { SendEmailDto } from './dtos/send-email.dto';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { EMAIL_ADAPTER } from './constants/mail.constant';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @Inject(EMAIL_ADAPTER)
    private readonly emailAdapter: IEmailAdapter,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async sendEmail(dto: SendEmailDto): Promise<void> {
    try {
      await this.emailAdapter.sendEmail(dto);
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);
      throw new BadRequestException(
        this.customI18nService.translate('validation.FAILED_SEND_EMAIL'),
      );
    }
  }
}
