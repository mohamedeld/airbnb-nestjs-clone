import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import dayjs from 'dayjs';
import { FindAllBookingsDto } from '../dtos/find-all-booking.dto';
import { Booking } from '../schemas/bookings.schema';
import { SortType } from 'src/common/data-access/enum/sort-type.enum';

@Injectable()
export class FindAllQueryBuilder {
  buildMatchQuery(query: FindAllBookingsDto): QueryFilter<Booking> {
    const matchQuery: QueryFilter<Booking> = {};
    if (query?.unit) matchQuery.unit = query.unit;
    if (query?.status) matchQuery.status = query.status;

    if (query?.checkIn)
      matchQuery.checkIn = { $gte: dayjs(query.checkIn).toDate() };
    if (query?.checkOut)
      matchQuery.checkOut = { $lte: dayjs(query.checkOut).toDate() };

    return matchQuery;
  }

  buildSortQuery(query: FindAllBookingsDto): QueryFilter<Booking> {
    const sortQuery: QueryFilter<Booking> = { createdAt: -1 };
    sortQuery.createdAt = query?.sortByCreatedAt === SortType.ASC ? 1 : -1;

    if (query?.sortByTotalAmount)
      sortQuery.totalAmount =
        query?.sortByTotalAmount === SortType.ASC ? 1 : -1;

    return sortQuery;
  }
}
