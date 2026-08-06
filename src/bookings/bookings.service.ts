import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './usecases/check-availability.usecase';
import { CheckAvailabilityDto } from './dtos/check-availability.dot';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingRequestUseCase } from './usecases/booking-request.usecase';
import { BookingRequestDto } from './dtos/booking-response.dto';
import {
  ICurrentUser,
  IPrincipal,
} from 'src/auth/interfaces/princapal.interace';
import { BookingResponseDto } from './dtos/booking-request.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllBookingsDto } from './dtos/find-all-booking.dto';
import { FindAllBookingsUseCase } from './usecases/find-al-bookings.usecase';
import { FindMyBookingsUseCase } from './usecases/find-my-booking.usecase';
import { FindByIdUseCase } from './usecases/find-booking-by-id.usecase';
import { Booking } from './schemas/bookings.schema';
import { QueryFilter } from 'mongoose';
import { FindOneBookingUseCase } from './usecases/find-one-booking.usecase';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { UpdateBookingByGuestUseCase } from './usecases/update-booking-by-guest.usecase';
import { CancelBookingByGuestUseCase } from './usecases/cancel-booking-by-guest.usecase';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { ChangeBookingStatusByHostUseCase } from './usecases/change-booking-stauts.usecase';
import { GuestReviewDto } from './dtos/guest-review.dto';
import { GuestReviewUseCase } from './usecases/guest-review.usecase';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly bookingRequestUseCase: BookingRequestUseCase,
    private readonly findAllBookingsUseCase: FindAllBookingsUseCase,
    private readonly findMyBookingUseCase: FindMyBookingsUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly findOneBookingUseCase: FindOneBookingUseCase,
    private readonly updateBookingByGuestUseCase: UpdateBookingByGuestUseCase,
    private readonly cancelBookingByGuestUseCase: CancelBookingByGuestUseCase,
    private readonly changeBookingStatusByHostUseCase: ChangeBookingStatusByHostUseCase,
    private readonly addReviewUseCase: GuestReviewUseCase,
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

  async findById(
    bookId: string,
    principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.findByIdUseCase.execute(bookId, principal);
  }
  async findOne(query: QueryFilter<Booking>): Promise<BookingResponseDto> {
    return this.findOneBookingUseCase.execute(query);
  }
  updateByGuest(
    id: string,
    body: UpdateBookingRequestDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    return this.updateBookingByGuestUseCase.execute(id, body, user);
  }

  async cancelByGuest(
    id: string,
    body: CancelBookingByGuestDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    return this.cancelBookingByGuestUseCase.execute(id, body, user);
  }
  async changeStatusByHost(
    id: string,
    body: ChangeBookingStatusDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    return this.changeBookingStatusByHostUseCase.execute(id, body, user);
  }

  async addReview(
    id: string,
    body: GuestReviewDto,
    user: ICurrentUser,
  ): Promise<BookingResponseDto> {
    return await this.addReviewUseCase.execute(id, body, user);
  }
}
