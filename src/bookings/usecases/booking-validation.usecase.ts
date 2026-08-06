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
    this.validateDateRange(body.checkIn, body.checkOut);
    await this.validateCapacity(body?.adultsCount, body?.kidsCount, body.unit);
    await this.validateUnitAvailability(body.unit, body.checkIn, body.checkOut);
  }
  async validateUnitAvailability(
    unit: string,
    checkIn: number | Date,
    checkOut: number | Date,
    bookingId?: string,
  ) {
    const overlappingBookings = await this.bookingRepository.find({
      unit: unit,
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      checkIn: { $lte: checkOut },
      checkOut: { $gte: checkIn },
      _id: { $ne: bookingId },
    });

    if (overlappingBookings.length > 0)
      throw new BadRequestException(
        'Unit is not available for the selected dates',
      );
  }

  async validateCapacity(
    adultsCount: number | undefined,
    kidsCount: number | undefined,
    unitId: string,
  ) {
    const unit = await this.unitService.findById(unitId);

    if (adultsCount && adultsCount > unit.adultsCount) {
      throw new BadRequestException('unit capacity is not enough for adults');
    }
    if (kidsCount && kidsCount > unit.kidsCount)
      throw new BadRequestException('unit capacity is not enough for kids');
  }

  validateDateRange(checkIn: number | Date, checkOut: number | Date) {
    if (dayjs(checkIn).isAfter(checkOut)) {
      throw new BadRequestException(
        'Check-in date must be before check-out date',
      );
    }
  }
}
