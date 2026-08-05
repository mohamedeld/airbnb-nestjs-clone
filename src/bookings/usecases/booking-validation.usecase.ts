import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CheckAvailabilityDto } from '../dtos/check-availability.dot';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UnitsService } from 'src/units/units.service';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingStatus } from '../enums/booking-status.enum';

@Injectable()
export class BookingValidationUseCase {
  constructor(
    private readonly customI18nService: CustomI18nService,
    private readonly unitService: UnitsService,
    private readonly bookingRepository: BookingsRepository,
  ) {}

  async execute(body: CheckAvailabilityDto): Promise<void> {
    if (dayjs(body?.checkIn)?.isAfter(body?.checkOut)) {
      throw new BadRequestException(
        this.customI18nService.translate('CHECK_IN_BEFORE'),
      );
    }
    const unit = await this.unitService.findOne({ _id: body?.unit });
    if (body?.adultsCount && unit?.adultsCount < body?.adultsCount) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.UNITY_CAPACITY_EXCEEDED'),
      );
    }
    if (body?.kidsCount && unit?.kidsCount < body?.kidsCount) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.UNITY_CAPACITY_EXCEEDED'),
      );
    }
    const overlappingBookings = await this.bookingRepository.find({
      unit: body.unit,
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      checkIn: { $lte: body?.checkOut },
      checkOut: { $gte: body?.checkIn },
    });
    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.UNIT_NOT_AVAILABLE'),
      );
    }
  }
}
