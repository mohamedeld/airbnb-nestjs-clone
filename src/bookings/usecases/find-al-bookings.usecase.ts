import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BookingsRepository } from '../repositories/bookings.repository';
import { BookingResponseDto } from '../dtos/booking-request.dto';
import { FindAllBookingsDto } from '../dtos/find-all-booking.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllQueryBuilder } from '../query-builder/factory-query-builder';

@Injectable()
export class FindAllBookingsUseCase {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly findAllQueryBuilder: FindAllQueryBuilder,
  ) {}

  async execute(
    query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    const matchQuery = this.findAllQueryBuilder.buildMatchQuery(query);
    const sortQuery = this.findAllQueryBuilder.buildSortQuery(query);

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
