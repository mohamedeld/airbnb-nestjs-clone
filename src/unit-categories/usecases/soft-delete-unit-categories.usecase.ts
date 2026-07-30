import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class SoftDeleteUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const UnitCategories = await this.UnitCategoriesRepository.findById(id);
    if (!UnitCategories) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.UnitCategories_NOT_FOUND'),
      );
    }
    await this.UnitCategoriesRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
