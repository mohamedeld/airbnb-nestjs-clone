import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { CheckAvailabilityDto } from '../dtos/check-availability.dot';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { CalculateTotalAmountUseCase } from './calculate-total-amount.usecase';

@Injectable()
export class CheckAvailabilityUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly calculateTotalAmountUseCase: CalculateTotalAmountUseCase,
  ) {}

  async execute(body: CheckAvailabilityDto): Promise<AvailabilityResponseDto> {
    await this.bookingValidationUseCase.execute(body);
    const bookingCalculation = await this.calculateTotalAmountUseCase.execute(
      body?.unit,
      body.checkIn,
      body.checkOut,
    );

    return {
      available: true,
      ...bookingCalculation,
    };
  }
}
