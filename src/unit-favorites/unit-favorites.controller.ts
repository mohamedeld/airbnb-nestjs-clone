import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { Allowed } from 'src/auth/decorators/roles.decorator';
import type { IPrincipal } from 'src/auth/interfaces/princapal.interace';
import { Roles } from 'src/common/constants';
import { FindUnitFavoritesDto } from './dtos/find-unit-favorites.dto';
import { PaginatedResult } from 'src/common/data-access';
import { UnitFavoriteResponseDto } from './dtos/unit-favorite-response.dto';
import { UnitFavoritesService } from './unit-favorites.service';

@Controller('favorites')
@Allowed([Roles.USER])
export class UnitFavoritesController {
  constructor(private readonly unitFavoritesService: UnitFavoritesService) {}
  @Post('/:unitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFavorite(
    @Param('unitId') unitId: string,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<void> {
    return this.unitFavoritesService.addFavorite(unitId, principal.user);
  }

  @Delete('/:unitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(
    @Param('unitId') unitId: string,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<void> {
    return this.unitFavoritesService.removeFavorite(unitId, principal.user);
  }

  @Get()
  async getFavorites(
    @Query() query: FindUnitFavoritesDto,
    @CurrentAccount() principal: IPrincipal,
  ): Promise<PaginatedResult<UnitFavoriteResponseDto>> {
    return this.unitFavoritesService.getFavorites(query, principal.user);
  }
}
