import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';
import { UnitCategoriesResponseDto } from '../dtos/unit-categories-response.dto';

@Injectable()
export class GetUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string) {
    const UnitCategories = await this.UnitCategoriesRepository.findById(id);
    if (!UnitCategories) {
      throw new BadRequestException(
        this.customI18n.translate('validation.UnitCategories_NOT_FOUND'),
      );
    }
    return plainToInstance(UnitCategoriesResponseDto, UnitCategories);
  }
}
