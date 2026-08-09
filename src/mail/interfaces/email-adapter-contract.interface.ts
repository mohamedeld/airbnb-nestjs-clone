import { SendEmailDto } from '../dtos/send-email.dto';

export interface IEmailAdapter {
  sendEmail(dto: SendEmailDto): Promise<void>;
}
