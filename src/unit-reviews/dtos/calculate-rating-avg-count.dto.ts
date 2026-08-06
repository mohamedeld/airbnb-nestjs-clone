import { ApiProperty } from '@nestjs/swagger';

export class CalculateRatingAvgAndCountDto {
  @ApiProperty({ description: 'Average unit rating', example: 4.7 })
  ratingAvg: number;

  @ApiProperty({ description: 'Unit ratings count', example: 15 })
  ratingCount: number;
}
