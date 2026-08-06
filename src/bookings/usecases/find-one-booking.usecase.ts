import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { Booking } from '../schemas/bookings.schema';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class FindOneBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly custom18n: CustomI18nService,
  ) {}

  async execute(query: QueryFilter<Booking>): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne(query);
    if (!booking)
      throw new NotFoundException(
        this.custom18n.translate('validation.BOOKING_NOT_FOUND'),
      );
    return plainToInstance(BookingResponseDto, booking);
  }
}
