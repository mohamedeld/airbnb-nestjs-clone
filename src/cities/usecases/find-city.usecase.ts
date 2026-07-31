import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repoistory/city.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CityResponseDto } from '../dtos/city-response.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

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
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_NOT_FOUND'),
      );
    }
    return plainToInstance(CityResponseDto, city);
  }
}
