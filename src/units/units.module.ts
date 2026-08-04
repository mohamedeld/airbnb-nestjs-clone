import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitRepository } from './repositories/unit.repository';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from './schema/unit.schema';
import { CreateUnitUseCase } from './usecases/create-unit.usecase';
import { CitiesModule } from 'src/cities/cities.module';
import { CountriesModule } from 'src/countries/countries.module';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';
import { UnitCategoriesModule } from 'src/unit-categories/unit-categories.module';
import { UnitValidationUseCase } from './usecases/unit-validation.usecase';
import { FindOneUnitUseCase } from './usecases/find-one-unit.usecase';
import { CheckUnitAuthUseCase } from './usecases/check-unit-auth.usecase';
import { UpdateUnitUseCase } from './usecases/update-unit.usecase';
import { FindByIdUnitUseCase } from './usecases/find-by-id.usecase';
import { FindAllUnitsUseCase } from './usecases/find-all-usecase';
import { DeleteUnitUseCase } from './usecases/delete-unit.usecase';
import { FindAllByUserUseCase } from './usecases/find-all-user-units.usecase';
import { ActivateUnitUseCase } from './usecases/activate-unit.usecase';
import { DeActivateUnitUseCase } from './usecases/deactivate-unit.usecase';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { DeleteUnitPhotosUseCase } from './usecases/delete-unit-photos.usecase';
import { UpdateUnitPhotosUsCase } from './usecases/update-unit-photos.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
    CitiesModule,
    CountriesModule,
    AppSettingsModule,
    UnitCategoriesModule,
    FilesUploadModule,
  ],
  controllers: [UnitsController],
  providers: [
    UnitsService,
    UnitRepository,
    CustomI18nService,
    CreateUnitUseCase,
    UnitValidationUseCase,
    FindOneUnitUseCase,
    CheckUnitAuthUseCase,
    UpdateUnitUseCase,
    FindByIdUnitUseCase,
    FindAllUnitsUseCase,
    DeleteUnitUseCase,
    FindAllByUserUseCase,
    ActivateUnitUseCase,
    DeActivateUnitUseCase,
    DeleteUnitPhotosUseCase,
    UpdateUnitPhotosUsCase,
  ],
})
export class UnitsModule {}
