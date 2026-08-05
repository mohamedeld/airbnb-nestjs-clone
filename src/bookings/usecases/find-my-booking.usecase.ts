import { Injectable } from '@nestjs/common';
import { BookingsRepository } from '../repositories/bookings.repository';
import { FindAllQueryBuilder } from '../query-builder/factory-query-builder';
import { FindAllBookingsDto } from '../dtos/find-all-booking.dto';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { PaginatedResult } from 'src/common/data-access';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindMyBookingsUseCase {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly findAllQueryBuilder: FindAllQueryBuilder,
  ) {}

  async execute(
    query: FindAllBookingsDto,
    currentUser: ICurrentUser,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    const matchQuery = this.findAllQueryBuilder.buildMatchQuery(query);
    const sortQuery = this.findAllQueryBuilder.buildSortQuery(query);

    if (query?.userType === 'guest') {
      matchQuery.guest = currentUser._id.toString();
    } else if (query?.userType === 'host') {
      matchQuery.host = currentUser._id.toString();
    } else {
      matchQuery.$or = [
        { guest: currentUser._id.toString() },
        { host: currentUser._id.toString() },
      ];
    }
    const results = await this.bookingsRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      sort: sortQuery,
      lean: true,
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name phoneNumber' },
        { path: 'host', select: 'name phoneNumber' },
      ],
    });

    return plainToInstance(PaginatedResult<BookingResponseDto>, results);
  }
}
