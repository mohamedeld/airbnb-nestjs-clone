import { Injectable } from '@nestjs/common';
import { CreateCityUseCase } from './usecases/create-city.usecase';
import { FinalAllCitiesUseCase } from './usecases/find-all-cities.usecase';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindCityUseCase } from './usecases/find-city.usecase';
import { UpdateCityUseCase } from './usecases/update-city.usecase';
import { UpdateCityDto } from './dtos/update-city.dto';
import { SoftDeleteCityUseCase } from './usecases/soft-delete-city.usecase';
import { DeleteCityUseCase } from './usecases/delete-city.usecase';
import { FindOneCityUseCase } from './usecases/find-one-city.usecase';
import { QueryFilter } from 'mongoose';
import { City } from './schema/city.schema';

@Injectable()
export class CitiesService {
  constructor(
    private readonly finalAllCitiesUseCase: FinalAllCitiesUseCase,
    private readonly createCityUseCase: CreateCityUseCase,
    private readonly findCityUseCase: FindCityUseCase,
    private readonly updateCityUseCase: UpdateCityUseCase,
    private readonly softDeleteCityUseCase: SoftDeleteCityUseCase,
    private readonly deleteCityUseCase: DeleteCityUseCase,
    private readonly findOneCityUseCase: FindOneCityUseCase,
  ) {}

  async createCity(body: CreateCityDto): Promise<CityResponseDto> {
    return await this.createCityUseCase.execute(body);
  }
  async findAllCities(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return await this.finalAllCitiesUseCase.execute(query);
  }

  async findOne(query: QueryFilter<City>): Promise<CityResponseDto> {
    return await this.findOneCityUseCase.execute(query);
  }

  async findCity(id: string): Promise<CityResponseDto> {
    return await this.findCityUseCase.execute(id);
  }

  async updateCity(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    return await this.updateCityUseCase.execute(id, body);
  }

  async softDeleteCity(id: string): Promise<void> {
    return await this.softDeleteCityUseCase.execute(id);
  }

  async deleteCity(id: string): Promise<void> {
    return await this.deleteCityUseCase.execute(id);
  }
}
