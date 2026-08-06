import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingParticipantAuthUseCase } from './booking-participant-auth.usecase';
import { FindOneBookingUseCase } from './find-one-booking.usecase';
import { CancelBookingByGuestDto } from '../dtos/cancel-booking-by-guest.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CancelBy } from '../enums/cancel-by.enum';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CancelBookingByGuestUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly bookingParticipantAuthUseCase: BookingParticipantAuthUseCase,
    private readonly findOneUseCase: FindOneBookingUseCase,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: CancelBookingByGuestDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    // 1. find booking by id
    const booking = await this.findOneUseCase.execute({ _id: id });

    // 2. validate if the user is the booking guest
    this.bookingParticipantAuthUseCase.checkGuestAuth(
      booking?.guest.toString(),
      user._id.toString(),
    );

    // 3. check booking to be cancled not be cancelled, completed
    if (
      booking.status === BookingStatus.CANCELLED ||
      booking.status === BookingStatus.COMPLETED
    )
      throw new BadRequestException(
        this.customI18nService.translate(
          'validation.BOOKING_CANNOT_BE_CANCELED',
        ),
      );

    // 4. cancel booking
    const updatedBooking = await this.bookingRepository.findOneAndUpdate(
      { _id: id },
      {
        status: BookingStatus.CANCELLED,
        cancellationReason: body?.cancellationReason,
        cancellationDate: new Date(),
        cancelBy: CancelBy.GUEST,
      },
      { returnDocument: 'after', lean: true },
    );

    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}
