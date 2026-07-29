import { Injectable } from '@nestjs/common';
import { Country } from '../schema/country.schema';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllCountriesDto } from '../dtos/final-all-countries.dto';
import { HydratedDocument, QueryFilter } from 'mongoose';
import { CountryRepository } from '../repository/country.repository';
import { PaginatedResult } from 'src/common/data-access';

@Injectable()
export class GetCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    query: FindAllCountriesDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    const matchQuery: QueryFilter<Country> = { isDeleted: false };
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;

    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query?.countryCode) {
      matchQuery.countryCode = { $regex: query.countryCode, $options: 'i' };
    }

    const result = await this.countryRepository.findPaginated(matchQuery, {
      page,
      limit,
    });
    const countries = plainToInstance(
      CountryResponseDto,
      result?.data?.map((country: HydratedDocument<Country>) =>
        country.toObject(),
      ),
    );
    return new PaginatedResult(
      countries,
      result?.totalCount,
      result?.page,
      result?.limit,
    );
  }
}
