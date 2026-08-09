import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { FindOtpRawUseCase } from './find-otp-raw.usecase';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';

@Injectable()
export class VerifyOtpUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly customI18nService: CustomI18nService,
    private readonly findOtpRawUseCase: FindOtpRawUseCase,
  ) {}

  async execute(body: VerifyOtpDto): Promise<void> {
    const otp = await this.findOtpRawUseCase.execute({ email: body.email });
    this.validateOtpBeforeVerify(otp, body);
    await this.otpRepository.findOneAndUpdate(
      { email: body.email },
      { isVerified: true },
    );
  }
  private validateOtpBeforeVerify(otp: OtpRawResponseDto, body: VerifyOtpDto) {
    if (!otp) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.INVALID_OTP'),
      );
    }
    if (otp?.isVerified) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.EMAIL_ALREADY_VERIFIED'),
      );
    }
    if (otp.code !== body.code) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.INVALID_OTP'),
      );
    }
    if (otp.expiresAt < new Date()) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.OTP_EXPIRED'),
      );
    }
  }
}
