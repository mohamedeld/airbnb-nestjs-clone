import { Injectable } from '@nestjs/common';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password.dto';

@Injectable()
export class VerifyForgetPasswordOtpUseCase {
  constructor(
    private readonly forgetPasswordRepository: ForgetPasswordRepository,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(body: VerifyForgetPasswordOtpDto): Promise<void> {
    const forgetPassword = await this.forgetPasswordRepository.findOne({
      email: body.email,
    });
    if (!forgetPassword)
      throw new BadRequestException(
        this.customI18nService.translate('validation.INVALID_EMAIL'),
      );

    if (forgetPassword.code !== body.code)
      throw new BadRequestException(
        this.customI18nService.translate('validation.INVALID_CODE'),
      );

    if (new Date() > new Date(forgetPassword.expiresAt))
      throw new BadRequestException(
        this.customI18nService.translate('validation.OTP_EXPIRED'),
      );

    if (forgetPassword.isVerified)
      throw new BadRequestException(
        this.customI18nService.translate('validation.CODE_ALREADY_USED'),
      );

    await this.forgetPasswordRepository.findOneAndUpdate(
      {
        email: body.email,
      },
      { isVerified: true },
    );
  }
}
