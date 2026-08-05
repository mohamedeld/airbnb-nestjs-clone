import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dot';
import { Public } from 'src/common/public.decorator';
import { Allowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { BookingRequestDto } from './dtos/booking-response.dto';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import type { IPrincipal } from 'src/auth/interfaces/princapal.interace';
import { BookingResponseDto } from './dtos/booking-request.dto';
import { FindAllBookingsDto } from './dtos/find-all-booking.dto';
import { PaginatedResult } from 'src/common/data-access';

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

  @Allowed([Roles.USER])
  @Post('create')
  async createBooking(
    @Body() body: BookingRequestDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.createBooking(body, currentAccount?.user);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Get()
  async findAll(
    @Query() query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return await this.bookingsService.findAll(query);
  }

  @Allowed([Roles.USER])
  @Get('me')
  async findMine(
    @Query() query: FindAllBookingsDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return await this.bookingsService.findMine(query, currentAccount?.user);
  }
}
