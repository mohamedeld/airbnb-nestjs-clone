import { Module } from '@nestjs/common';
import { UnitFavoritesService } from './unit-favorites.service';
import { UnitFavoritesController } from './unit-favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UnitFavorite,
  UnitFavoriteSchema,
} from './schema/unit-favorites.schema';
import { UnitFavoriteRepository } from './repositories/unit-favorite.repositories';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UnitsModule } from 'src/units/units.module';
import { AddUnitFavoriteUseCase } from './usecases/add-unit-favorites.usecase';
import { RemoveUnitFavoriteUseCase } from './usecases/remove-unit-favorites.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitFavorite.name, schema: UnitFavoriteSchema },
    ]),
    UnitsModule,
  ],
  providers: [
    UnitFavoritesService,
    UnitFavoriteRepository,
    CustomI18nService,
    AddUnitFavoriteUseCase,
    RemoveUnitFavoriteUseCase,
  ],
  controllers: [UnitFavoritesController],
})
export class UnitFavoritesModule {}
