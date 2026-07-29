import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindCityByIdDto } from './dtos/find-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post('create')
  async createCity(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return await this.citiesService.createCity(body);
  }

  @Get()
  async findCities(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return await this.citiesService.findAllCities(query);
  }
  @Get('/:id')
  async findCity(@Param() param: FindCityByIdDto): Promise<CityResponseDto> {
    return await this.citiesService.findCity(param.id);
  }

  @Patch('/:id')
  async updateCity(
    @Param() param: FindCityByIdDto,
    @Body() body: UpdateCityDto,
  ) {
    return await this.citiesService.updateCity(param.id, body);
  }

  @Delete('/soft-delete/:id')
  async softDeleteCity(@Param() param: FindCityByIdDto) {
    return await this.citiesService.softDeleteCity(param.id);
  }

  @Delete('/:id')
  async deleteCity(@Param() param: FindCityByIdDto) {
    return await this.citiesService.deleteCity(param.id);
  }
}
