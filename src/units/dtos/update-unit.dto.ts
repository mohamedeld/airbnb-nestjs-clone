import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUnitDto {
  @ApiPropertyOptional({
    description: 'Unit title',
    example: 'Updated apartment title',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    description: 'Unit description',
    example: 'Updated apartment description.',
  })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'Unit address',
    example: '14 Nile Street, Cairo',
  })
  @IsOptional()
  address: string;

  @ApiPropertyOptional({ description: 'Cost per day', example: 1300 })
  @IsOptional()
  costPerDay: number;

  @ApiPropertyOptional({
    description: 'Country MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsMongoId()
  country: string;

  @ApiPropertyOptional({
    description: 'City MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiPropertyOptional({
    description: 'Unit category MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  @IsMongoId()
  unitCategory: string;

  @ApiPropertyOptional({ description: 'Number of rooms', example: 3 })
  @IsOptional()
  roomsCount: number;

  @ApiPropertyOptional({ description: 'Allowed adults count', example: 3 })
  @IsOptional()
  adultsCount: number;

  @ApiPropertyOptional({ description: 'Allowed kids count', example: 1 })
  @IsOptional()
  kidsCount: number;

  @ApiPropertyOptional({
    description: 'Whether internet is available',
    example: true,
  })
  @IsOptional()
  hasInternetService: boolean;

  @ApiPropertyOptional({
    description: 'Whether a kitchen is available',
    example: true,
  })
  @IsOptional()
  hasKitchen: boolean;

  @ApiPropertyOptional({
    description: 'Whether a private garage is available',
    example: false,
  })
  @IsOptional()
  hasPrivateGarage: boolean;
}
