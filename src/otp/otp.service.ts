import { Injectable } from '@nestjs/common';
import { SendOtpUseCase } from './usecases/send-otp.usecase';
import { VerifyOtpUseCase } from './usecases/verify-otp.usecase';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { FindOtpRawUseCase } from './usecases/find-otp-raw.usecase';
import { QueryFilter } from 'mongoose';
import { Otp } from './schema/otp.schema';
import { OtpRawResponseDto } from './dtos/otp-raw-response.dto';

@Injectable()
export class OtpService {
  constructor(
    private readonly sendOtpUseCase: SendOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
    private readonly findOtpRawUsecase: FindOtpRawUseCase,
  ) {}

  async sendOtp(email: string): Promise<void> {
    return await this.sendOtpUseCase.execute(email);
  }

  async verifyOtp(body: VerifyOtpDto): Promise<void> {
    return await this.verifyOtpUseCase.execute(body);
  }
  async findOtpRaw(query: QueryFilter<Otp>): Promise<OtpRawResponseDto> {
    return this.findOtpRawUsecase.execute(query);
  }
}
