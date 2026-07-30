import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';

import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CreateUnitCategoriesDto } from '../dtos/create-unit-categories.dto';
import { UnitCategoriesResponseDto } from '../dtos/unit-categories-response.dto';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class CreateUnitCategoriesUseCase {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    body: CreateUnitCategoriesDto,
  ): Promise<UnitCategoriesResponseDto> {
    const existingUnitCategories = await this.UnitCategoriesRepository.findOne({
      name: body.name,
    });
    if (existingUnitCategories) {
      throw new BadRequestException(
        this.customI18n.translate('validation.UnitCategories_EXIST'),
      );
    }
    const createdUnitCategories =
      await this.UnitCategoriesRepository.create(body);
    return plainToInstance(
      UnitCategoriesResponseDto,
      createdUnitCategories.toObject(),
    );
  }
}
