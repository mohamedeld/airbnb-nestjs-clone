import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { CityRepository } from '../repoistory/city.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { PaginatedResult } from 'src/common/data-access';
import { CityResponseDto } from '../dtos/city-response.dto';
import { City } from '../schema/city.schema';
import { FindAllCitiesDto } from '../dtos/find-all-cities.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class FinalAllCitiesUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;
    const matchQuery: QueryFilter<City> = {
      isDeleted: false,
    };
    if (query?.name) {
      matchQuery.name = { $regex: query?.name, $options: 'i' };
    }
    if (query?.country) {
      matchQuery.country = query?.country;
    }
    const result = await this.cityRepository.findPaginated(matchQuery, {
      page,
      limit,
      ignoreLimit: query?.ignoreLimit,
      populate: [{ path: 'country', select: 'name countryCode' }],
      lean: true,
    });
    return plainToInstance(PaginatedResult<CityResponseDto>, result);
  }
}
