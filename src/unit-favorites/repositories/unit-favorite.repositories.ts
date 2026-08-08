import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UnitFavorite } from '../schema/unit-favorites.schema';

@Injectable()
export class UnitFavoriteRepository extends BaseRepository<UnitFavorite> {
  constructor(
    @InjectModel(UnitFavorite.name)
    private readonly unitFavoritesModel: Model<HydratedDocument<UnitFavorite>>,
  ) {
    super(unitFavoritesModel);
  }
}
