import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitReviewDto {
  @ApiProperty({
    description: 'Booking MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsString()
  booking: string;

  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({
    description: 'Guest user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsString()
  guest: string;

  @ApiProperty({
    description: 'Guest rating from 1 to 5',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    description: 'Guest review comment',
    example: 'Great stay and very clean unit.',
    minLength: 5,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  comment: string;
}
