import { Injectable } from '@nestjs/common';
import { IEmailAdapter } from '../interfaces/email-adapter-contract.interface';
import { SendEmailDto } from '../dtos/send-email.dto';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from 'src/common/configration/environment.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerEmailAdapter implements IEmailAdapter {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService<IEnvironment>) {
    const smtpHost = this.configService.getOrThrow('smtpHost');
    const smtpPort = this.configService.getOrThrow('smtpPort');
    const smtpService = this.configService.getOrThrow('smtpService');
    const smtpAuthEmail = this.configService.getOrThrow('smtpAuthEmail');
    const smtpAuthPassword = this.configService.getOrThrow('smtpAuthPassword');
    const smtpSecure = this.configService.getOrThrow('smtpSecure');

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      // service: smtpService,
      auth: {
        user: smtpAuthEmail,
        pass: smtpAuthPassword,
      },
      secure: smtpSecure,
    });
  }

  async sendEmail(dto: SendEmailDto): Promise<void> {
    await this.transporter.sendMail({
      from: dto.from,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
    });
  }
}
