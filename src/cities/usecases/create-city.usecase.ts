import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repoistory/city.repository';

@Injectable()
export class CreateCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  //   async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
  //     const existingCountry = await this.countryRepository.findOne({
  //       name: body.name,
  //     });
  //     if (existingCountry) {
  //       throw new BadRequestException(
  //         this.customI18n.translate('validation.COUNTRY_EXIST'),
  //       );
  //     }
  //     const createdCountry = await this.countryRepository.create(body);
  //     return plainToInstance(CountryResponseDto, createdCountry.toObject());
  //   }
}
