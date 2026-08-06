import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/bookings.schema';
import { BookingsRepository } from './repositories/bookings.repository';
import { CheckAvailabilityUseCase } from './usecases/check-availability.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UnitsModule } from 'src/units/units.module';
import { BookingValidationUseCase } from './usecases/booking-validation.usecase';
import { CalculateTotalAmountUseCase } from './usecases/calculate-total-amount.usecase';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';
import { BookingRequestUseCase } from './usecases/booking-request.usecase';
import { FindAllBookingsUseCase } from './usecases/find-al-bookings.usecase';
import { FindAllQueryBuilder } from './query-builder/factory-query-builder';
import { FindMyBookingsUseCase } from './usecases/find-my-booking.usecase';
import { CheckBookingAuthUseCase } from './usecases/check-auth-booking.usecase';
import { FindByIdUseCase } from './usecases/find-booking-by-id.usecase';
import { FindOneBookingUseCase } from './usecases/find-one-booking.usecase';
import { BookingParticipantAuthUseCase } from './usecases/booking-participant-auth.usecase';
import { UpdateBookingByGuestUseCase } from './usecases/update-booking-by-guest.usecase';
import { CancelBookingByGuestUseCase } from './usecases/cancel-booking-by-guest.usecase';
import { ChangeBookingStatusByHostUseCase } from './usecases/change-booking-stauts.usecase';
import { GuestReviewUseCase } from './usecases/guest-review.usecase';
import { UnitReviewsModule } from 'src/unit-reviews/unit-reviews.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    UnitsModule,
    AppSettingsModule,
    UnitReviewsModule,
    UnitsModule,
  ],
  providers: [
    BookingsService,
    BookingsRepository,
    CheckAvailabilityUseCase,
    CustomI18nService,
    BookingValidationUseCase,
    CalculateTotalAmountUseCase,
    BookingRequestUseCase,
    FindAllBookingsUseCase,
    FindAllQueryBuilder,
    FindMyBookingsUseCase,
    CheckBookingAuthUseCase,
    FindByIdUseCase,
    FindOneBookingUseCase,
    BookingParticipantAuthUseCase,
    UpdateBookingByGuestUseCase,
    CancelBookingByGuestUseCase,
    ChangeBookingStatusByHostUseCase,
    GuestReviewUseCase,
  ],
  controllers: [BookingsController],
})
export class BookingsModule {}
