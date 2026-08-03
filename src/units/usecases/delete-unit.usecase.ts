import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { FindOneUnitUseCase } from './find-one-unit.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';

@Injectable()
export class DeleteUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly findOneUseCase: FindOneUnitUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(unitId: string, currentUser: ICurrentUser): Promise<void> {
    const unit = await this.findOneUseCase.execute({ _id: unitId });
    if (!unit) {
      throw new NotFoundException(
        this.customI18nService.translate('validation.UNIT_NOT_FOUND'),
      );
    }

    this.checkUnitAuthUseCase.execute(currentUser, unit?.user);

    await this.unitRepository.findByIdAndUpdate(
      unitId,
      { isDeleted: true },
      { returnDocument: 'after' },
    );
  }
}
