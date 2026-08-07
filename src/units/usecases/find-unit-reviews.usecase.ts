import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../common/data-access';
import { UnitReviewsService } from '../../unit-reviews/unit-reviews.service';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { UnitReviewsDto } from '../dtos/unit-reviews.dto';

@Injectable()
export class FindUnitReviewsUseCase {
  constructor(private readonly unitReviewsService: UnitReviewsService) {}

  async execute(
    unitId: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<UnitReviewsDto>> {
    const result = await this.unitReviewsService.findUnitReviews({
      unit: unitId,
      ...query,
    });

    return plainToInstance(PaginatedResult<UnitReviewsDto>, result);

    // projection: application code level
    // usecase: when you want to transform the data that coming from database in the application code
    // const transformedData = plainToInstance(UnitReviewsDto, result.data, {
    //   excludeExtraneousValues: true,
    // });
    //
    // return new PaginatedResult<UnitReviewsDto>(
    //   transformedData,
    //   result.pageCount,
    //   result.limit,
    //   result.totalCount,
    // );
  }
}
