import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class GetCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string) {
    const country = await this.countryRepository.findById(id);
    if (!country) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    return plainToInstance(CountryResponseDto, country);
  }
}
