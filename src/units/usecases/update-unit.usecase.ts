import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { FindOneUnitUseCase } from './find-one-unit.usecase';
import { UpdateUnitDto } from '../dtos/update-unit.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly customI18n: CustomI18nService,
    private readonly findOneUnitUseCase: FindOneUnitUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly unitValidationUseCase: UnitValidationUseCase,
  ) {}

  async execute(
    id: string,
    body: UpdateUnitDto,
    user: ICurrentUser,
  ): Promise<UnitResponseDto> {
    const unit = await this.findOneUnitUseCase.execute({
      _id: id,
    });
    if (!unit) {
      throw new NotFoundException(
        this.customI18n.translate('validation.UNIT_NOT_FOUND'),
      );
    }
    this.checkUnitAuthUseCase.execute(user, unit.user.toString());
    await this.unitValidationUseCase.execute(body);
    const updatedUnit = await this.unitRepository.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { returnDocument: 'after' },
    );

    return plainToInstance(UnitResponseDto, updatedUnit?.toObject());
  }
}
