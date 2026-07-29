import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repoistory/city.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';
import { plainToInstance } from 'class-transformer';
import { CountriesService } from 'src/countries/countries.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class UpdateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
    private readonly countryService: CountriesService,
  ) {}
  async execute(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    const existingCity = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!existingCity) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_NOT_FOUND'),
      );
    }
    const existingCityName = await this.cityRepository.findOne({
      name: body.name,
      isDeleted: false,
      country: existingCity.name,
      _id: { $ne: id },
    });
    if (existingCityName) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_EXIST'),
      );
    }
    if (body?.country) {
      const existingCountry = await this.countryService.getCountryById(
        body?.country,
      );
      if (!existingCountry) {
        throw new BadRequestException(
          this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
        );
      }
    }
    const updatedCity = await this.cityRepository.findByIdAndUpdate(id, body);

    return plainToInstance(CityResponseDto, updatedCity?.toObject());
  }
}
