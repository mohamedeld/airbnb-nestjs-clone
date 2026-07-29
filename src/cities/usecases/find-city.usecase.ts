import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repoistory/city.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CityResponseDto } from '../dtos/city-response.dto';

@Injectable()
export class FindCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string) {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!city) {
      throw new Error(this.customI18n.translate('validation.CITY_NOT_FOUND'));
    }
    return plainToInstance(CityResponseDto, city);
  }
}
