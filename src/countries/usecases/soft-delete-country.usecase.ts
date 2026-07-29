import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class SoftDeleteCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const country = await this.countryRepository.findById(id);
    if (!country) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    await this.countryRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
