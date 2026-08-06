import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookingRequestDto {
  @ApiPropertyOptional({
    description: 'Updated check-in date',
    example: '2026-08-02T00:00:00.000Z',
  })
  @IsOptional()
  checkIn?: number | Date;

  @ApiPropertyOptional({
    description: 'Updated check-out date',
    example: '2026-08-06T00:00:00.000Z',
  })
  @IsOptional()
  checkOut?: number | Date;

  @ApiPropertyOptional({ description: 'Updated number of adults', example: 2 })
  @IsOptional()
  adultsCount?: number;

  @ApiPropertyOptional({ description: 'Updated number of kids', example: 1 })
  @IsOptional()
  kidsCount?: number;

  @ApiPropertyOptional({
    description: 'Updated guest notes',
    example: 'Please confirm parking availability',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
