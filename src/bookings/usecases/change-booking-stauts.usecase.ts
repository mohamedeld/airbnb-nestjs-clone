import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingParticipantAuthUseCase } from './booking-participant-auth.usecase';
import { FindOneBookingUseCase } from './find-one-booking.usecase';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';
import { CancelBy } from '../enums/cancel-by.enum';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class ChangeBookingStatusByHostUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly bookingParticipantAuthUsecase: BookingParticipantAuthUseCase,
    private readonly findOneUseCase: FindOneBookingUseCase,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: ChangeBookingStatusDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    const bookingToUpdate = await this.findOneUseCase.execute({ _id: id });

    // 1.check if the user is the host of the booking
    this.bookingParticipantAuthUsecase.checkHostAuth(
      bookingToUpdate.host.toString(),
      user._id.toString(),
    );

    // if host want approve the booking, make sure booking not approved, set approval
    if (
      body.status === BookingStatus.CONFIRMED &&
      bookingToUpdate.status === BookingStatus.CONFIRMED
    )
      throw new BadRequestException(
        this.customI18nService.translate('validation.BOOKING_ALREADY_APPROVED'),
      );

    if (body.status === BookingStatus.CANCELLED) {
      await this.updateBookingStatusToCancel(id, bookingToUpdate.status, body);
    }

    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        status: body.status,
      },
      { returnDocument: 'after', lean: true },
    );

    // 4. return the updated booking
    return plainToInstance(BookingResponseDto, updatedBooking);
  }

  private async updateBookingStatusToCancel(
    id: string,
    currentBookingStatus: BookingStatus,
    body: ChangeBookingStatusDto,
  ) {
    // 2. if host want cancell the booking, make sure booking not cancelled, set cancellaion
    if (currentBookingStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking already cancelled');
    }
    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        status: BookingStatus.CANCELLED,
        cancellationReason: body?.cancellationReason,
        cancellationDate: new Date(),
        cancellationBy: CancelBy.HOST,
      },
      { returnDocument: 'after', lean: true },
    );

    // TODO: Send email notification
    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}
