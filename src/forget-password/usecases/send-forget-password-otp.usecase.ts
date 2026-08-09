import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { MailService } from 'src/mail/mail.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class SendForgetPasswordOtpUseCase {
  constructor(
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersService.findOne({ email });
    if (!user)
      throw new BadRequestException(
        this.customI18nService.translate('validation.USER_NOT_FOUND'),
      );

    const code = this.generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await this.forgetPasswordRepository.findOneAndUpdate(
      { email },
      { expiresAt, code, isVerified: false },
      { upsert: true },
    );

    await this.mailService.sendEmail({
      to: email,
      subject: 'Forget Password OTP',
      text: `Your OTP is ${code}`,
    });
  }

  private generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
