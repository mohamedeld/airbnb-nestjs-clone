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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    UnitsModule,
    AppSettingsModule,
  ],
  providers: [
    BookingsService,
    BookingsRepository,
    CheckAvailabilityUseCase,
    CustomI18nService,
    BookingValidationUseCase,
    CalculateTotalAmountUseCase,
  ],
  controllers: [BookingsController],
})
export class BookingsModule {}
