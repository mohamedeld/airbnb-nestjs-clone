import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { Booking } from './schemas/bookings.schema';
import type { QueryFilter } from 'mongoose';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { GuestReviewDto } from './dtos/guest-review.dto';

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

  @Get()
  async findOne(
    @Query() query: QueryFilter<Booking>,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.findOne(query);
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.findById(id, principal);
  }

  @Allowed([Roles.USER])
  @Patch('/:id')
  async updateByGuest(
    @Param('id') id: string,
    @Body() body: UpdateBookingRequestDto,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.updateByGuest(id, body, principal.user);
  }

  @Allowed([Roles.USER])
  @Patch('/:id/cancel')
  async cancelByGuest(
    @Param('id') id: string,
    @Body() body: CancelBookingByGuestDto,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.cancelByGuest(id, body, principal.user);
  }

  @Allowed([Roles.USER])
  @Patch('/:id/status')
  async changeStatusByHost(
    @Param('id') id: string,
    @Body() body: ChangeBookingStatusDto,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.changeStatusByHost(id, body, principal.user);
  }

  @Allowed([Roles.USER])
  @Patch('/:id/review')
  async addReview(
    @Param('id') id: string,
    @Body() body: GuestReviewDto,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.addReview(id, body, principal.user);
  }
}
