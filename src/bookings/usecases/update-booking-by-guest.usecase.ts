import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UpdateBookingRequestDto } from '../dtos/update-booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { BookingParticipantAuthUseCase } from './booking-participant-auth.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import dayjs from 'dayjs';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateBookingByGuestUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingParticipantAuthUseCase: BookingParticipantAuthUseCase,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: UpdateBookingRequestDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking)
      throw new NotFoundException(
        this.customI18nService.translate('validation.BOOKING_NOT_FOUND'),
      );

    this.bookingParticipantAuthUseCase.checkGuestAuth(
      booking?.guest,
      user?._id?.toString(),
    );
    await this.validateDateRange(
      body,
      booking.unit.toString(),
      booking._id.toString(),
    );
    // 4. validate capacity
    await this.validateCapacity(
      body?.adultsCount,
      body?.kidsCount,
      booking.unit.toString(),
    );
    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      {
        returnDocument: 'after',
        lean: true,
      },
    );

    return plainToInstance(BookingResponseDto, updatedBooking);
  }
  private async validateDateRange(
    body: UpdateBookingRequestDto,
    unitId: string,
    bookingId: string,
  ) {
    if (body?.checkIn && !body?.checkOut)
      throw new BadRequestException(
        this.customI18nService.translate('validation.CHECK_OUT_REQUIRED'),
      );
    if (body?.checkOut && !body?.checkIn)
      throw new BadRequestException(
        this.customI18nService.translate('validation.CHECK_IN_REQUIRED'),
      );

    if (body?.checkIn && body?.checkOut) {
      body.checkIn = dayjs(body.checkIn).toDate();
      body.checkOut = dayjs(body.checkOut).toDate();

      this.bookingValidationUseCase.validateDateRange(
        body.checkIn,
        body.checkOut,
      );

      await this.bookingValidationUseCase.validateUnitAvailability(
        unitId,
        body.checkIn,
        body.checkOut,
        bookingId,
      );
    }
  }
  private async validateCapacity(
    adultsCount: number | undefined,
    kidsCount: number | undefined,
    unit: string,
  ) {
    if (adultsCount || kidsCount)
      await this.bookingValidationUseCase.validateCapacity(
        adultsCount,
        kidsCount,
        unit,
      );
  }
}
