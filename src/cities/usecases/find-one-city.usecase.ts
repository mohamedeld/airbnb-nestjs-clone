import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repoistory/city.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { QueryFilter } from 'mongoose';
import { City } from '../schema/city.schema';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';
import { CityResponseDto } from '../dtos/city-response.dto';

@Injectable()
export class FindOneCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(query: QueryFilter<City>) {
    const city = await this.cityRepository.findOne(query);
    if (!city) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_NOT_FOUND'),
      );
    }
    return plainToInstance(CityResponseDto, city);
  }
}
