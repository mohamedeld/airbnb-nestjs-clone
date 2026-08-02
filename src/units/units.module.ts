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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
    CitiesModule,
    CountriesModule,
    AppSettingsModule,
    UnitCategoriesModule,
  ],
  controllers: [UnitsController],
  providers: [
    UnitsService,
    UnitRepository,
    CustomI18nService,
    CreateUnitUseCase,
    UnitValidationUseCase,
  ],
})
export class UnitsModule {}
