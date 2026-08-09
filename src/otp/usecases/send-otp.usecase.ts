import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class SendOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly customI18nService: CustomI18nService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async execute(email: string): Promise<void> {
    await this.validateBeforeSendOtp(email);
    const code = this.generateOtp();
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 10); // Set expiration time to 10 minutes from now
    await this.otpRepository.findOneAndUpdate(
      { email },
      {
        code,
        expiredAt,
        isVerified: false,
      },
      { upsert: true },
    );
    await this.mailService.sendEmail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${code}`,
    });
  }

  private generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private async validateBeforeSendOtp(email: string): Promise<void> {
    const isVerified = await this.otpRepository.findOne({
      email,
      isVerified: true,
    });
    if (isVerified) {
      const existingUser = await this.usersService.findOne({ email });
      if (existingUser) {
        throw new BadRequestException(
          this.customI18nService.translate('validation.EMAIL_ALREADY_VERIFIED'),
        );
      }
    }
  }
}
