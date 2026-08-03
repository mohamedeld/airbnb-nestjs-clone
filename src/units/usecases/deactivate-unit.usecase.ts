import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { FindOneUnitUseCase } from './find-one-unit.usecase';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class DeActivateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly customI18n: CustomI18nService,
    private readonly findOneUnitUseCase: FindOneUnitUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
  ) {}

  async execute(id: string, user: ICurrentUser): Promise<UnitResponseDto> {
    const unit = await this.findOneUnitUseCase.execute({
      _id: id,
    });
    if (!unit) {
      throw new NotFoundException(
        this.customI18n.translate('validation.UNIT_NOT_FOUND'),
      );
    }
    this.checkUnitAuthUseCase.execute(user, unit.user.toString());

    if (unit.isDeleted)
      throw new BadRequestException(
        this.customI18n.translate('validation.UNIT_DELETED'),
      );

    const updatedUnit = await this.unitRepository.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { returnDocument: 'after' },
    );

    return plainToInstance(UnitResponseDto, updatedUnit?.toObject());
  }
}
