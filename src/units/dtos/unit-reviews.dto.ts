// import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// export class GuestReviewResponseDto {
//   @Expose()
//   _id: string;
//
//   @Expose()
//   name: string;
// }

export class UnitReviewsDto {
  // @Expose()
  // @Type(() => GuestReviewResponseDto)
  @ApiProperty({
    description: 'Guest user details or ID',
    example: '60d21b4967d0d8992e610c85',
  })
  guest: string;

  // @Expose()
  @ApiProperty({ description: 'Review rating from 1 to 5', example: 5 })
  rating: number;

  // @Expose()
  @ApiProperty({
    description: 'Review comment',
    example: 'Great stay and very clean unit.',
  })
  comment: string;

  // @Expose()
  @ApiProperty({
    description: 'Review creation date',
    example: '2026-08-06T00:00:00.000Z',
  })
  createdAt: Date;
}
