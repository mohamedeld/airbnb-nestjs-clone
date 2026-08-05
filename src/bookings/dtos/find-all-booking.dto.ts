import { PaginationDto } from '../../common/data-access/dto/pagination.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortType } from 'src/common/data-access/enum/sort-type.enum';

export class FindAllBookingsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by booking status',
    enum: BookingStatus,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({
    description: 'Filter by unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({
    description: 'Filter bookings from this check-in date',
    example: '2026-08-01T00:00:00.000Z',
  })
  @IsOptional()
  checkIn?: Date | number;

  @ApiPropertyOptional({
    description: 'Filter bookings until this check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  @IsOptional()
  checkOut?: Date | number;

  @ApiPropertyOptional({
    description: 'Sort by creation date',
    enum: SortType,
  })
  @IsOptional()
  @IsEnum(SortType)
  sortByCreatedAt?: SortType;

  @ApiPropertyOptional({
    description: 'Sort by total amount',
    enum: SortType,
  })
  @IsOptional()
  @IsEnum(SortType)
  sortByTotalAmount?: SortType;

  @ApiPropertyOptional({
    description: 'Filter bookings by user participation type',
    enum: ['guest', 'host'],
  })
  @IsOptional()
  userType: 'guest' | 'host';
}
