import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitAvgRateAndCountDto {
  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsNotEmpty()
  unitId: string;

  @ApiProperty({ description: 'Updated rating count', example: 15 })
  @IsNotEmpty()
  ratingCount: number;

  @ApiProperty({ description: 'Updated rating average', example: 4.7 })
  @IsNotEmpty()
  ratingAvg: number;
}
