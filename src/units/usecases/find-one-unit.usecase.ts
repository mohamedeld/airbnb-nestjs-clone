import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UnitRepository } from '../repositories/unit.repository';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { Unit } from '../schema/unit.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class FindOneUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(query: QueryFilter<Unit>): Promise<UnitResponseDto> {
    const unit = await this.unitRepository.findOne(query);
    if (!unit)
      throw new NotFoundException(
        this.customI18n.translate('validation.UNIT_NOT_FOUND'),
      );
    return plainToInstance(UnitResponseDto, unit);
  }
}
