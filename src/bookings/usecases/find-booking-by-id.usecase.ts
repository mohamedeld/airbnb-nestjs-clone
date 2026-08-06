import { Injectable } from '@nestjs/common';
import { Roles } from '../../common/constants';
import { plainToInstance } from 'class-transformer';
import { IPrincipal } from 'src/auth/interfaces/princapal.interace';
import { BookingsRepository } from '../repositories/bookings.repository';
import { CheckBookingAuthUseCase } from './check-auth-booking.usecase';
import { BookingResponseDto } from '../dtos/booking-request.dto';

@Injectable()
export class FindByIdUseCase {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly checkBookingAuthUseCase: CheckBookingAuthUseCase,
  ) {}

  async execute(
    bookId: string,
    principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    if (principal.role === Roles.USER)
      await this.checkBookingAuthUseCase.execute(bookId, principal.user._id);

    const booking = await this.bookingRepository.findById(bookId, {
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name phoneNumber' },
        { path: 'host', select: 'name phoneNumber' },
      ],
    });
    return plainToInstance(BookingResponseDto, booking?.toObject());
  }
}
