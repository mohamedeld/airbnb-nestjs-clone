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

export class GuestReviewDto {
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
