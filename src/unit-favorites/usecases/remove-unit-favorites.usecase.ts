import { Injectable } from '@nestjs/common';
import { UnitFavoriteRepository } from '../repositories/unit-favorite.repositories';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class RemoveUnitFavoriteUseCase {
  constructor(
    private readonly unitFavoriteRepository: UnitFavoriteRepository,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(unitId: string, user: ICurrentUser): Promise<void> {
    const deletedFavorite = await this.unitFavoriteRepository.findOneAndDelete({
      unit: unitId,
      user: user._id.toString(),
    });

    if (!deletedFavorite)
      throw new BadRequestException(
        this.customI18nService.translate('validation.FAVORITE_NOT_FOUND'),
      );
  }
}
