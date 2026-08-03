import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../common/data-access';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { UnitRepository } from '../repositories/unit.repository';
import { FindAllUnitsDto } from '../dtos/find-all-unit.dto';
import { Unit } from '../schema/unit.schema';

@Injectable()
export class FindAllUnitsUseCase {
  constructor(private readonly unitsRepository: UnitRepository) {}

  async execute(
    query: FindAllUnitsDto,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    const matchQuery: QueryFilter<Unit> = {
      isDeleted: { $ne: true },
      isActive: true,
    };

    if (query?.title) matchQuery.title = { $regex: query.title, $options: 'i' };
    if (query?.country) matchQuery.country = query.country;
    if (query?.city) matchQuery.city = query.city;

    const result = await this.unitsRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      sort: { createdAt: -1 },
      lean: true,
    });

    return plainToInstance(PaginatedResult<UnitResponseDto>, result);
  }
}
