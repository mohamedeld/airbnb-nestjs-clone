import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { UnitsService } from 'src/units/units.service';
import { AppSettingsService } from 'src/app-settings/app-settings.service';
import { BookingCalculationResponse } from '../dtos/booking-calculation.dto';

@Injectable()
export class CalculateTotalAmountUseCase {
  constructor(
    private readonly unitService: UnitsService,
    private readonly appSettingsService: AppSettingsService,
  ) {}

  async execute(
    unitId: string,
    checkIn: Date | number,
    checkOut: Date | number,
  ): Promise<BookingCalculationResponse> {
    const daysCount = dayjs(checkOut)?.diff(dayjs(checkIn), 'day');
    const unit = await this.unitService.findOne({ _id: unitId });
    const pricePerDay = unit?.costPerDay ?? 0;
    const bookingAmount = daysCount * pricePerDay;
    const appSetting = await this.appSettingsService.getAppSettings();
    const vatAmount = (bookingAmount * appSetting?.vatRate) / 100;
    const totalAmount = bookingAmount + vatAmount;
    return {
      pricePerDay,
      daysCount,
      vat: appSetting?.vatRate,
      bookingAmount,
      vatAmount,
      totalAmount,
    };
  }
}
