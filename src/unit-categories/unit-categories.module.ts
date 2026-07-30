import { Module } from '@nestjs/common';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUnitCategoriesUseCase } from './usecases/create-unit-categories.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UnitCategories,
  UnitCategoriesSchema,
} from './schema/unit-categories-schema.dto';
import { DeleteUnitCategoriesUseCase } from './usecases/delete-unit-categories.usecase';
import { SoftDeleteUnitCategoriesUseCase } from './usecases/soft-delete-unit-categories.usecase';
import { UpdateUnitCategoriesUseCase } from './usecases/update-unit-categories.usecases';
import { UnitCategoriesRepository } from './repository/unit-categories.repository';
import { FindAllUnitCategoriesUseCase } from './usecases/final-all-unit-categories.usecase';
import { GetUnitCategoriesUseCase } from './usecases/get-unit-categories.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitCategories.name, schema: UnitCategoriesSchema },
    ]),
  ],
  controllers: [UnitCategoriesController],
  providers: [
    UnitCategoriesRepository,
    UnitCategoriesService,
    CustomI18nService,
    CreateUnitCategoriesUseCase,
    FindAllUnitCategoriesUseCase,
    GetUnitCategoriesUseCase,
    DeleteUnitCategoriesUseCase,
    SoftDeleteUnitCategoriesUseCase,
    UpdateUnitCategoriesUseCase,
  ],
})
export class UnitCategoriesModule {}
