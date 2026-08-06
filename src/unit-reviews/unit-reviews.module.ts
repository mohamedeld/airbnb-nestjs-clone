import { Module } from '@nestjs/common';
import { UnitReviewsService } from './unit-reviews.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitReviews, UnitReviewsSchema } from './schemas/unit-review.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUnitReviewUseCase } from './usecases/create-unit-review.usecase';
import { CalculateRatingAvgUseCase } from './usecases/calculate-rating-avg.usecase';
import { FindUnitReviewsUseCase } from './usecases/find-unit-reviews.usecase';
import { UnitReviewsRepository } from './repositories/unit-reviews.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitReviews.name, schema: UnitReviewsSchema },
    ]),
  ],

  providers: [
    UnitReviewsService,
    UnitReviewsRepository,
    CustomI18nService,
    CreateUnitReviewUseCase,
    CalculateRatingAvgUseCase,
    FindUnitReviewsUseCase,
  ],
  exports: [UnitReviewsService],
})
export class UnitReviewsModule {}
