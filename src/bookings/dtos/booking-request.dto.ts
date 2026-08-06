import { BookingStatus } from '../enums/booking-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GuestReview } from '../schemas/subdocument/guest-review.schema';
import { GuestReviewDto } from './guest-review.dto';

export class BookingResponseDto {
  @ApiProperty({
    description: 'Booking ID',
    example: '60d21b4967d0d8992e610c85',
  })
  _id: string;

  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  unit: string;

  @ApiProperty({
    description: 'Guest user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  guest: string;

  @ApiProperty({
    description: 'Host user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  host: string;

  @ApiProperty({
    description: 'Check-in date',
    example: '2026-08-01T00:00:00.000Z',
  })
  checkIn: number | Date;

  @ApiProperty({
    description: 'Check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  checkOut: number | Date;

  @ApiPropertyOptional({ description: 'Number of adults', example: 2 })
  adultsCount?: number;

  @ApiPropertyOptional({ description: 'Number of kids', example: 1 })
  kidsCount?: number;

  @ApiPropertyOptional({
    description: 'Guest notes',
    example: 'Late check-in requested',
  })
  notes?: string;

  @ApiProperty({ description: 'Unit price per day', example: 1200 })
  pricePerDay: number;

  @ApiProperty({ description: 'Number of booked days', example: 4 })
  daysCount: number;

  @ApiProperty({ description: 'Booking amount before VAT', example: 4800 })
  bookingAmount: number;

  @ApiProperty({ description: 'VAT rate percentage', example: 14 })
  vat: number;

  @ApiProperty({ description: 'VAT amount', example: 672 })
  vatAmount: number;

  @ApiProperty({ description: 'Total amount including VAT', example: 5472 })
  totalAmount: number;

  @ApiProperty({ description: 'Booking status', enum: BookingStatus })
  status: BookingStatus;

  @ApiPropertyOptional({
    description: 'Cancellation reason',
    example: 'Travel plans changed',
  })
  cancellationReason?: string;

  @ApiPropertyOptional({
    description: 'Guest review',
    type: () => GuestReviewDto,
  })
  guestReview?: GuestReview;
}
