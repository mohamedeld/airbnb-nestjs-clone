import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { UnitReviewsRepository } from '../repositories/unit-reviews.repository';
import { CreateUnitReviewDto } from '../dtos/create-unit-review.dto';

@Injectable()
export class CreateUnitReviewUseCase {
  constructor(private readonly unitReviewsRepository: UnitReviewsRepository) {}

  async execute(
    body: CreateUnitReviewDto,
    session?: ClientSession,
  ): Promise<void> {
    await this.unitReviewsRepository.create(body, { session });
  }
}
