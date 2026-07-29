import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { CountryResponseDto } from './dtos/country-response.dto';
import { GetCountryUseCase } from './usecases/get-country.usecase';
import { GetCountriesUseCase } from './usecases/find-countries.usecase';
import { SoftDeleteCountryUseCase } from './usecases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './usecases/update-country.usecase';
import { FindAllCountriesDto } from './dtos/final-all-countries.dto';
import { PaginatedResult } from 'src/common/data-access';

@Injectable()
export class CountriesService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly getCountryUseCase: GetCountryUseCase,
    private readonly getCountriesUseCase: GetCountriesUseCase,
    private readonly softDeleteCountryUseCase: SoftDeleteCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
  ) {}

  async createCountry(body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.createCountryUseCase.execute(body);
  }
  async getCountryById(id: string): Promise<CountryResponseDto> {
    return this.getCountryUseCase.execute(id);
  }

  async getCountries(
    query: FindAllCountriesDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.getCountriesUseCase.execute(query);
  }

  async softDeleteCountry(id: string): Promise<void> {
    return this.softDeleteCountryUseCase.execute(id);
  }
  async updateCountry(
    id: string,
    body: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.updateCountryUseCase.execute(id, body);
  }
}
