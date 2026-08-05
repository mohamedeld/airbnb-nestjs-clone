import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { CalculateTotalAmountUseCase } from './calculate-total-amount.usecase';
import { UnitsService } from 'src/units/units.service';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BookingRequestDto } from '../dtos/booking-response.dto';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class BookingRequestUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: CalculateTotalAmountUseCase,
    private readonly unitsService: UnitsService,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(
    body: BookingRequestDto,
    currentUser: ICurrentUser,
  ): Promise<BookingResponseDto> {
    const unit = await this.unitsService.findById(body.unit);
    if (unit.user === currentUser._id?.toString()) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.BOOK_OWN'),
      );
    }
    await this.bookingValidationUseCase.execute(body);
    const bookingCalculation = await this.bookingCalculationUseCase.execute(
      body.unit,
      body.checkIn,
      body.checkOut,
    );

    body.checkIn = dayjs(body.checkIn).toDate();
    body.checkOut = dayjs(body.checkOut).toDate();
    const bookingRequest = await this.bookingRepository.create({
      ...body,
      guest: currentUser._id.toString(),
      host: unit.user,
      daysCount: bookingCalculation.daysCount,
      bookingAmount: bookingCalculation.bookingAmount,
      vat: bookingCalculation.vat,
      vatAmount: bookingCalculation.vatAmount,
      totalAmount: bookingCalculation.totalAmount,
      pricePerDay: bookingCalculation.pricePerDay,
    });

    // TODO: Send email notification to the host (unit.user)

    return plainToInstance(BookingResponseDto, bookingRequest.toObject());
  }
}
