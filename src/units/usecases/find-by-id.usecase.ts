import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class FindByIdUnitUseCase {
  constructor(
    private readonly unitsRepository: UnitRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string): Promise<UnitResponseDto> {
    const unit = await this.unitsRepository.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    });
    if (!unit)
      throw new NotFoundException(
        this.customI18n.translate('validation.UNIT_NOT_FOUND'),
      );
    return plainToInstance(UnitResponseDto, unit);
  }
}
