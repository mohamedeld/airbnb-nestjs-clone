import { ApiProperty } from '@nestjs/swagger';

export class UnitFavoriteResponseDto {
  @ApiProperty({
    description: 'Unit favorite ID',
    example: '60d21b4967d0d8992e610c85',
  })
  _id: string;

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

  @ApiProperty({ description: 'Cost per day', example: 1200 })
  costPerDay: number;

  @ApiProperty({
    description: 'Unit photo URLs',
    type: [String],
    example: ['https://example.com/unit-photo.jpg'],
  })
  photos: string[];
}
