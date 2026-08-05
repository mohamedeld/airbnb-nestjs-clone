import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dot';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
  ) {}

  async checkAvailability(
    body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return await this.checkAvailabilityUseCase.execute(body);
  }
}
