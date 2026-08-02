import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schema/country.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { GetCountryUseCase } from './usecases/get-country.usecase';
import { GetCountriesUseCase } from './usecases/find-countries.usecase';
import { SoftDeleteCountryUseCase } from './usecases/soft-delete-country.usecase';
import { UpdateCountryUseCase } from './usecases/update-country.usecase';
import { CountryRepository } from './repository/country.repository';
import { FindOneUseCase } from './usecases/find-one.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],

  providers: [
    CountriesService,
    CreateCountryUseCase,
    CustomI18nService,
    GetCountryUseCase,
    GetCountriesUseCase,
    SoftDeleteCountryUseCase,
    UpdateCountryUseCase,
    CountryRepository,
    FindOneUseCase,
  ],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
