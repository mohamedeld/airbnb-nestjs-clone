import { Injectable } from '@nestjs/common';
import { FindUnitFavoritesDto } from './dtos/find-unit-favorites.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UnitFavoriteResponseDto } from './dtos/unit-favorite-response.dto';
import { PaginatedResult } from 'src/common/data-access';
import { AddUnitFavoriteUseCase } from './usecases/add-unit-favorites.usecase';
import { RemoveUnitFavoriteUseCase } from './usecases/remove-unit-favorites.usecase';

@Injectable()
export class UnitFavoritesService {
  constructor(
    private readonly addUnitFavoriteUseCase: AddUnitFavoriteUseCase,
    private readonly removeUnitFavoriteUseCase: RemoveUnitFavoriteUseCase,
  ) {}
  async addFavorite(unitId: string, user: ICurrentUser): Promise<void> {
    return this.addUnitFavoriteUseCase.execute(unitId, user);
  }

  async removeFavorite(unitId: string, user: ICurrentUser): Promise<void> {
    return this.removeUnitFavoriteUseCase.execute(unitId, user);
  }

  //   async getFavorites(
  //     query: FindUnitFavoritesDto,
  //     user: ICurrentUser,
  //   ): Promise<PaginatedResult<UnitFavoriteResponseDto>> {
  //     // return this.findUnitFavoritesUseCase.execute(query, user);
  //   }
}
