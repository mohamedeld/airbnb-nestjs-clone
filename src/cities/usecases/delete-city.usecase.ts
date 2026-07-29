import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CityRepository } from 'src/cities/repoistory/city.repository';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class DeleteCityUseCase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!city) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CITY_NOT_FOUND'),
      );
    }
    await this.cityRepository.findByIdAndDelete(id);
  }
}
