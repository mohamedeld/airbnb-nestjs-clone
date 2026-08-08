import { Injectable } from '@nestjs/common';
import { UnitFavoriteRepository } from '../repositories/unit-favorite.repositories';
import { UnitsService } from 'src/units/units.service';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class AddUnitFavoriteUseCase {
  constructor(
    private readonly unitFavoriteRepository: UnitFavoriteRepository,
    private readonly unitsService: UnitsService,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(unitId: string, user: ICurrentUser): Promise<void> {
    const unit = await this.unitsService.findById(unitId);

    if (unit.user.toString() === user?._id?.toString()) {
      throw new BadRequestException(
        this.customI18nService.translate(
          'validation.CANNOT_ADD_OWN_UNIT_TO_FAVOURITES',
        ),
      );
    }
    const existingFavorite = await this.unitFavoriteRepository.findOne({
      user: user?._id?.toString(),
      unit: unitId,
    });
    if (existingFavorite) {
      throw new BadRequestException(
        this.customI18nService.translate(
          'validation.UNIT_FAVORITE_ALREADY_EXIST',
        ),
      );
    }

    await this.unitFavoriteRepository.create({
      user: user?._id?.toString(),
      unit: unitId,
    });
  }
}
