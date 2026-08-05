import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dot';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingRequestUseCase } from './usecases/booking-request.usecase';
import { BookingRequestDto } from './dtos/booking-response.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BookingResponseDto } from './dtos/booking-request.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllBookingsDto } from './dtos/find-all-booking.dto';
import { FindAllBookingsUseCase } from './usecases/find-al-bookings.usecase';
import { FindMyBookingsUseCase } from './usecases/find-my-booking.usecase';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly bookingRequestUseCase: BookingRequestUseCase,
    private readonly findAllBookingsUseCase: FindAllBookingsUseCase,
    private readonly findMyBookingUseCase: FindMyBookingsUseCase,
  ) {}

  async checkAvailability(
    body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return await this.checkAvailabilityUseCase.execute(body);
  }

  async createBooking(
    body: BookingRequestDto,
    currentUser: ICurrentUser,
  ): Promise<BookingResponseDto> {
    return this.bookingRequestUseCase.execute(body, currentUser);
  }

  findAll(
    query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.findAllBookingsUseCase.execute(query);
  }

  findMine(
    query: FindAllBookingsDto,
    user: ICurrentUser,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.findMyBookingUseCase.execute(query, user);
  }
}
