import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from './repoistory/city.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schema/city.schema';
import { CreateCityUseCase } from './usecases/create-city.usecase';
import { FinalAllCitiesUseCase } from './usecases/find-all-cities.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { FindCityUseCase } from './usecases/find-city.usecase';
import { CountriesModule } from 'src/countries/countries.module';
import { UpdateCityUseCase } from './usecases/update-city.usecase';
import { SoftDeleteCityUseCase } from './usecases/soft-delete-city.usecase';
import { DeleteCityUseCase } from './usecases/delete-city.usecase';
import { FindOneCityUseCase } from './usecases/find-one-city.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    CountriesModule,
  ],
  controllers: [CitiesController],
  providers: [
    CitiesService,
    CityRepository,
    CreateCityUseCase,
    FinalAllCitiesUseCase,
    CustomI18nService,
    FindCityUseCase,
    UpdateCityUseCase,
    SoftDeleteCityUseCase,
    DeleteCityUseCase,
    FindOneCityUseCase,
  ],
  exports: [CitiesService],
})
export class CitiesModule {}
