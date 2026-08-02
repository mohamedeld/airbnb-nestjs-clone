import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../repository/country.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';
import { Country } from '../schema/country.schema';
import { CountryResponseDto } from '../dtos/country-response.dto';

@Injectable()
export class FindOneUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(query: QueryFilter<Country>) {
    const country = await this.countryRepository.findOne(query);
    if (!country) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    return plainToInstance(CountryResponseDto, country);
  }
}
