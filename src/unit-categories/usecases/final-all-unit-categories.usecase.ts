import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';
import { PaginatedResult } from 'src/common/data-access';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';
import { UnitCategoriesResponseDto } from '../dtos/unit-categories-response.dto';
import { UnitCategories } from '../schema/unit-categories-schema.dto';
import { FindAllUnitCategoriesDto } from '../dtos/find-all-unit-categories.dto';

@Injectable()
export class FindAllUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoriesResponseDto>> {
    const matchQuery: QueryFilter<UnitCategories> = { isDeleted: false };
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;

    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }

    const result = await this.UnitCategoriesRepository.findPaginated(
      matchQuery,
      {
        page,
        limit,
      },
    );
    return plainToInstance(PaginatedResult<UnitCategoriesResponseDto>, result);
  }
}
