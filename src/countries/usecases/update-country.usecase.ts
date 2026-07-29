import { Injectable } from '@nestjs/common';
import { Country } from '../schema/country.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class UpdateCountryUseCase {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: Partial<Country>,
  ): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findById(id);
    if (country?.isDeleted) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    if (!country) {
      throw new BadRequestException(
        this.customI18n.translate('validation.COUNTRY_NOT_FOUND'),
      );
    }
    if (body?.name) {
      const existingCountry = await this.countryRepository.findOne({
        name: body.name,
        _id: { $ne: id },
        isDeleted: { $ne: true },
      });
      if (existingCountry) {
        throw new BadRequestException(
          this.customI18n.translate('validation.COUNTRY_EXIST'),
        );
      }
    }
    const updatedCountry = await this.countryRepository.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
