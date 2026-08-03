import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../common/data-access';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { UnitRepository } from '../repositories/unit.repository';
import { FindAllUnitsDto } from '../dtos/find-all-unit.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { Unit } from '../schema/unit.schema';

@Injectable()
export class FindAllByUserUseCase {
  constructor(private readonly unitsRepository: UnitRepository) {}

  async execute(
    query: FindAllUnitsDto,
    currentUser: ICurrentUser,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    const matchQuery: QueryFilter<Unit> = {
      isDeleted: { $ne: true },
      user: currentUser?._id?.toString(),
    };

    if (query?.title) matchQuery.name = { $regex: query.title, $options: 'i' };
    if (query?.country) matchQuery.country = query.country;
    if (query?.city) matchQuery.city = query.city;

    const result = await this.unitsRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      lean: true,
    });

    return plainToInstance(PaginatedResult<UnitResponseDto>, result);
  }
}
