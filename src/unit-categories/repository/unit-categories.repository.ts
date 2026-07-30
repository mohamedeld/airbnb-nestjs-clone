import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitCategories } from '../schema/unit-categories-schema.dto';

@Injectable()
export class UnitCategoriesRepository extends BaseRepository<UnitCategories> {
  constructor(
    @InjectModel(UnitCategories.name)
    private unitCategoriesModel: Model<UnitCategories>,
  ) {
    super(unitCategoriesModel);
  }
}
