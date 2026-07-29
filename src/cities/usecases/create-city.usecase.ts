import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repoistory/city.repository';
import { CreateCityDto } from '../dtos/create-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';
import { CountriesService } from 'src/countries/countries.service';

@Injectable()
export class CreateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
    private readonly countryService: CountriesService,
  ) {}

  async execute(body: CreateCityDto): Promise<CityResponseDto> {
    const existingCity = await this.cityRepository.findOne({
      name: body.name,
      country: body.country,
      isDeleted: false,
    });
    if (existingCity) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_EXIST'),
      );
    }
    const existingCountry = await this.countryService.getCountryById(
      body.country,
    );
    if (!existingCountry) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    const createdCity = await this.cityRepository.create(body);
    return plainToInstance(CityResponseDto, createdCity.toObject());
  }
}
