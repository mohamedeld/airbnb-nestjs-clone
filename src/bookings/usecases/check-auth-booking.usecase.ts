import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class CheckBookingAuthUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly custom18n: CustomI18nService,
  ) {}

  async execute(bookingId: string, userId: string): Promise<void> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking)
      throw new NotFoundException(
        this.custom18n.translate('validation.BOOKING_NOT_FOUND'),
      );

    if (
      booking.guest.toString() !== userId.toString() &&
      booking.host.toString() !== userId.toString()
    )
      throw new ForbiddenException(
        this.custom18n.translate('validation.BOOKING_FORBIDDEN'),
      );
  }
}
