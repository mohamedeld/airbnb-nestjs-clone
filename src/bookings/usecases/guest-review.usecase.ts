import { Injectable, Logger } from '@nestjs/common';
import { GuestReviewDto } from '../dtos/guest-review.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { BookingsRepository } from '../repositories/bookings.repository';
import { FindOneBookingUseCase } from './find-one-booking.usecase';
import { BookingParticipantAuthUseCase } from './booking-participant-auth.usecase';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { BookingStatus } from '../enums/booking-status.enum';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UnitReviewsService } from 'src/unit-reviews/unit-reviews.service';
import { UnitsService } from 'src/units/units.service';
import { plainToInstance } from 'class-transformer';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BaseCustomException } from 'src/common/errors-handling/custom-exceptions/base-custom-exception';

@Injectable()
export class GuestReviewUseCase {
  private readonly logger = new Logger(GuestReviewUseCase.name);

  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly findOneBookingUseCase: FindOneBookingUseCase,
    private readonly bookingParticipantAuthUseCase: BookingParticipantAuthUseCase,
    private readonly customI18nService: CustomI18nService,
    private readonly unitReviewsService: UnitReviewsService,
    private readonly unitService: UnitsService,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async execute(
    id: string,
    body: GuestReviewDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    const booking = await this.findOneBookingUseCase.execute({
      _id: id,
    });

    this.bookingParticipantAuthUseCase.checkGuestAuth(
      booking.guest.toString(),
      user._id.toString(),
    );
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        this.customI18nService.translate(
          'validation.BOOKING_NOT_COMPLETED_REVIEW',
        ),
      );
    }
    // 4. Make sure guest has not already reviewed
    if (booking?.guestReview) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.GUEST_ALREADY_REVIEWED'),
      );
    }

    const session = await this.connection.startSession();

    let updatedBooking: any;
    try {
      await session?.withTransaction(async () => {
        updatedBooking = await this.bookingRepository.findByIdAndUpdate(
          id,
          { guestReview: body },
          { returnDocument: 'after', lean: true, session },
        );

        await this.unitReviewsService.createUnitReview(
          {
            unit: booking.unit.toString(),
            guest: booking.guest.toString(),
            rating: body.rating,
            comment: body.comment,
            booking: booking?._id?.toString(),
          },
          session,
        );
        const { ratingAvg, ratingCount } =
          await this.unitReviewsService.calculateRatingAvg(
            booking?.unit?.toString(),
            session,
          );
        await this.unitService.updateUnitAvgRateAndCount(
          {
            unitId: booking.unit.toString(),
            ratingAvg,
            ratingCount,
          },
          session,
        );
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BaseCustomException) throw error;
      throw new BadRequestException('Failed to review booking');
    } finally {
      // cleanup
      await session.endSession();
    }

    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}
