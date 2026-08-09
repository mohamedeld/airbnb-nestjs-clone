import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';
import { plainToInstance } from 'class-transformer';
import { OtpRepository } from '../repositories/otp.repository';
import { Otp } from '../schema/otp.schema';

@Injectable()
export class FindOtpRawUseCase {
  constructor(private readonly otpRepository: OtpRepository) {}

  async execute(query: QueryFilter<Otp>): Promise<OtpRawResponseDto> {
    const otp = await this.otpRepository.findOne(query);
    return plainToInstance(OtpRawResponseDto, otp);
  }
}
