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
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { FindByIdDto } from './dtos/find-by-id.dto';
import { FindAllCountriesDto } from './dtos/final-all-countries.dto';
import { PaginatedResult } from 'src/common/data-access';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post('create')
  async createCountry(
    @Body() body: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.createCountry(body);
  }

  @Get('/:id')
  async getCountryById(
    @Param() param: FindByIdDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.getCountryById(param.id);
  }

  @Get()
  async getCountries(
    @Query() query: FindAllCountriesDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.getCountries(query);
  }

  @Delete('soft-delete/:id')
  async softDeleteCountry(@Param() param: FindByIdDto): Promise<void> {
    return this.countriesService.softDeleteCountry(param.id);
  }

  @Patch('/:id')
  async updateCountry(
    @Param() param: FindByIdDto,
    @Body() body: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateCountry(param.id, body);
  }
}
