import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';
import { UnitCategories } from '../schema/unit-categories-schema.dto';
import { UnitCategoriesResponseDto } from '../dtos/unit-categories-response.dto';

@Injectable()
export class UpdateUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: Partial<UnitCategories>,
  ): Promise<UnitCategoriesResponseDto> {
    const UnitCategories = await this.UnitCategoriesRepository.findById(id);
    if (!UnitCategories) {
      throw new BadRequestException(
        this.customI18n.translate('validation.UnitCategories_NOT_FOUND'),
      );
    }
    if (body?.name) {
      const existingUnitCategories =
        await this.UnitCategoriesRepository.findOne({
          name: body.name,
          _id: { $ne: id },
          isDeleted: { $ne: true },
        });
      if (existingUnitCategories) {
        throw new BadRequestException(
          this.customI18n.translate('validation.UnitCategories_EXIST'),
        );
      }
    }
    const updatedUnitCategories =
      await this.UnitCategoriesRepository.findByIdAndUpdate(id, body);
    return plainToInstance(
      UnitCategoriesResponseDto,
      updatedUnitCategories?.toObject(),
    );
  }
}
