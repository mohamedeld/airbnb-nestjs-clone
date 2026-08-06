import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { UnitReviews } from '../schemas/unit-review.schema';

@Injectable()
export class UnitReviewsRepository extends BaseRepository<UnitReviews> {
  constructor(
    @InjectModel(UnitReviews.name)
    private readonly unitReviewsModel: Model<HydratedDocument<UnitReviews>>,
  ) {
    super(unitReviewsModel);
  }
}
