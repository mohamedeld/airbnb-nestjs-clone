import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CancelBookingByGuestDto {
  @ApiPropertyOptional({
    description: 'Guest cancellation reason',
    example: 'Travel plans changed',
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
