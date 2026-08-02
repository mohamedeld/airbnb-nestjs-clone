import { ApiProperty } from '@nestjs/swagger';

export class UnitResponseDto {
  @ApiProperty({
    description: 'Unit title',
    example: 'Modern apartment in Cairo',
  })
  title: string;

  @ApiProperty({
    description: 'Unit description',
    example: 'Comfortable apartment near downtown Cairo.',
  })
  description: string;

  @ApiProperty({
    description: 'Unit address',
    example: '12 Nile Street, Cairo',
  })
  address: string;

  @ApiProperty({
    description: 'Unit photo URLs',
    type: [String],
    example: ['https://example.com/unit-photo.jpg'],
  })
  photos: string[];

  @ApiProperty({ description: 'Cost per day', example: 1200 })
  costPerDay: number;

  @ApiProperty({
    description: 'Country MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  country: string;

  @ApiProperty({
    description: 'City MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  city: string;

  @ApiProperty({
    description: 'Unit category MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  unitCategory: string;

  @ApiProperty({
    description: 'Owner user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  user: string;

  @ApiProperty({ description: 'Number of rooms', example: 2 })
  roomsCount: number;

  @ApiProperty({ description: 'Allowed adults count', example: 2 })
  adultsCount: number;

  @ApiProperty({ description: 'Allowed kids count', example: 1 })
  kidsCount: number;

  @ApiProperty({ description: 'Whether internet is available', example: true })
  hasInternetService: boolean;

  @ApiProperty({ description: 'Whether a kitchen is available', example: true })
  hasKitchen: boolean;

  @ApiProperty({
    description: 'Whether a private garage is available',
    example: false,
  })
  hasPrivateGarage: boolean;

  @ApiProperty({ description: 'Average unit rating', example: 4.7 })
  avgRate: number;

  @ApiProperty({ description: 'Unit ratings count', example: 15 })
  rateCount: number;

  @ApiProperty({ description: 'Whether the unit is deleted', example: false })
  isDeleted: boolean;

  @ApiProperty({ description: 'Whether the unit is active', example: true })
  isActive: boolean;
}
