import { Injectable } from '@nestjs/common';
import { CreateUnitReviewUseCase } from './usecases/create-unit-review.usecase';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { ClientSession } from 'mongoose';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-count.dto';
import { CalculateRatingAvgUseCase } from './usecases/calculate-rating-avg.usecase';
import { FindUnitReviewsUseCase } from './usecases/find-unit-reviews.usecase';
import { FindUnitReviewDto } from './dtos/find-unit-review.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindUnitReviewResponseDto } from './dtos/find-unit-review-response.dto';

@Injectable()
export class UnitReviewsService {
  constructor(
    private readonly createUnitReviewUseCase: CreateUnitReviewUseCase,
    private readonly calculateRatingAvgUseCase: CalculateRatingAvgUseCase,
    private readonly findUnitReviewsUsecase: FindUnitReviewsUseCase,
  ) {}

  async createUnitReview(
    body: CreateUnitReviewDto,
    session?: ClientSession,
  ): Promise<void> {
    await this.createUnitReviewUseCase.execute(body, session);
  }

  async calculateRatingAvg(
    unitId: string,
    session?: ClientSession,
  ): Promise<CalculateRatingAvgAndCountDto> {
    return this.calculateRatingAvgUseCase.execute(unitId, session);
  }
  async findUnitReviews(
    query: FindUnitReviewDto,
  ): Promise<PaginatedResult<FindUnitReviewResponseDto>> {
    return this.findUnitReviewsUsecase.execute(query);
  }
}
