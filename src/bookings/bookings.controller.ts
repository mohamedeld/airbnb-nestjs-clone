import { Controller, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dot';
import { Public } from 'src/common/public.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Public()
  @Get('/check-availability')
  async checkAvailability(
    @Query() query: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.bookingsService.checkAvailability(query);
  }
}
