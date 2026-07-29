import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class CreateCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existingCountry = await this.countryRepository.findOne({
      name: body.name,
    });
    if (existingCountry) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_EXIST'),
      );
    }
    const createdCountry = await this.countryRepository.create(body);
    return plainToInstance(CountryResponseDto, createdCountry.toObject());
  }
}
