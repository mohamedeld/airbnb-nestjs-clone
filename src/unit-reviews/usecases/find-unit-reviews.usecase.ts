import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../common/data-access';
import { FindUnitReviewResponseDto } from '../dtos/find-unit-review-response.dto';
import { UnitReviewsRepository } from '../repositories/unit-reviews.repository';
import { plainToInstance } from 'class-transformer';
import { FindUnitReviewDto } from '../dtos/find-unit-review.dto';

@Injectable()
export class FindUnitReviewsUseCase {
  constructor(private readonly unitReviewsRepository: UnitReviewsRepository) {}

  async execute(
    query: FindUnitReviewDto,
  ): Promise<PaginatedResult<FindUnitReviewResponseDto>> {
    const result = await this.unitReviewsRepository.findPaginated(
      {
        unit: query.unit,
      },
      {
        // projection: database level (more performance)
        select: '-booking -unit -__v -updatedAt',
        page: query?.page,
        limit: query?.limit,
        ignoreLimit: query?.ignoreLimit,
        lean: true,

        populate: [{ path: 'guest', select: 'name' }],
      },
    );

    return plainToInstance(PaginatedResult<FindUnitReviewResponseDto>, result);
  }
}
