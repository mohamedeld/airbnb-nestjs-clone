import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Unit title',
    example: 'Modern apartment in Cairo',
    minLength: 5,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Unit description',
    example: 'Comfortable apartment near downtown Cairo.',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Unit address',
    example: '12 Nile Street, Cairo',
  })
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({
    description: 'Uploaded unit photo URLs',
    type: [String],
    example: ['https://example.com/unit-photo.jpg'],
  })
  @IsOptional()
  photos: string[];

  @ApiProperty({ description: 'Cost per day', example: 1200 })
  @IsNotEmpty()
  costPerDay: number;

  @ApiProperty({
    description: 'Country MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @ApiProperty({
    description: 'City MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  city: string;

  @ApiProperty({
    description: 'Unit category MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  unitCategory: string;

  @ApiPropertyOptional({
    description: 'Owner user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsOptional()
  user: string;

  @ApiProperty({ description: 'Number of rooms', example: 2 })
  @IsNotEmpty()
  roomsCount: number;

  @ApiProperty({ description: 'Allowed kids count', example: 1 })
  @IsNotEmpty()
  kidsCount: number;

  @ApiProperty({ description: 'Allowed adults count', example: 2 })
  @IsNotEmpty()
  adultsCount: number;

  @ApiProperty({ description: 'Whether internet is available', example: true })
  @IsNotEmpty()
  hasInternetService: boolean;

  @ApiProperty({ description: 'Whether a kitchen is available', example: true })
  @IsNotEmpty()
  hasKitchen: boolean;

  @ApiPropertyOptional({
    description: 'Whether a private garage is available',
    example: false,
  })
  @IsOptional()
  hasPrivateGarage: boolean;
}
