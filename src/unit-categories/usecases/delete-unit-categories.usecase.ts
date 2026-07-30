import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class DeleteUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const UnitCategories = await this.UnitCategoriesRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!UnitCategories) {
      throw new BadRequestException(
        this.customI18n.translate('validation.UnitCategories_NOT_FOUND'),
      );
    }
    await this.UnitCategoriesRepository.findByIdAndDelete(id);
  }
}
