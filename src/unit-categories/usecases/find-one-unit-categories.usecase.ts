import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { UnitCategories } from '../schema/unit-categories-schema.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesResponseDto } from '../dtos/unit-categories-response.dto';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class FindOneUnitCategories {
  constructor(
    private readonly UnitCategoriesRepository: UnitCategoriesRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(query: QueryFilter<UnitCategories>) {
    const UnitCategories = await this.UnitCategoriesRepository.findOne(query);
    if (!UnitCategories) {
      throw new BadRequestException(
        this.customI18n.translate('validation.UnitCategories_NOT_FOUND'),
      );
    }
    return plainToInstance(UnitCategoriesResponseDto, UnitCategories);
  }
}
