import { ClientSession } from 'mongoose';
import { CalculateRatingAvgAndCountDto } from '../dtos/calculate-rating-avg-count.dto';
import { Injectable } from '@nestjs/common';
import { UnitReviewsRepository } from '../repositories/unit-reviews.repository';

@Injectable()
export class CalculateRatingAvgUseCase {
  constructor(private readonly unitReviewsRepository: UnitReviewsRepository) {}
  async execute(
    unitId: string,
    session?: ClientSession,
  ): Promise<CalculateRatingAvgAndCountDto> {
    const result = await this.unitReviewsRepository.aggregate<{
      ratingAvg: number;
      ratingCount: number;
    }>(
      [
        {
          $match: { unit: unitId },
        },
        {
          $group: {
            _id: '$unit',
            ratingAvg: { $avg: '$rating' },
            ratingCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            ratingAvg: 1,
            ratingCount: 1,
          },
        },
      ],
      { session },
    );

    if (result.length === 0) {
      return { ratingAvg: 0, ratingCount: 0 };
    }

    const { ratingAvg, ratingCount } = result[0];

    return { ratingAvg, ratingCount };
  }
}
