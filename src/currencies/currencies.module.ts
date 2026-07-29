import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateCurrencyUseCase } from './usecases/create-currency.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schema/currency-schema.dto';
import { GetCurrenciesUseCase } from './usecases/final-all-currencies.usecase';
import { GetCurrencyUseCase } from './usecases/get-currency.usecase';
import { DeleteCurrencyUseCase } from './usecases/delete-currency.usecase';
import { SoftDeleteCurrencyUseCase } from './usecases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './usecases/update-currency.usecases';
import { CurrencyRepository } from './repository/currency.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrenciesController],
  providers: [
    CurrencyRepository,
    CurrenciesService,
    CustomI18nService,
    CreateCurrencyUseCase,
    GetCurrenciesUseCase,
    GetCurrencyUseCase,
    DeleteCurrencyUseCase,
    SoftDeleteCurrencyUseCase,
    UpdateCurrencyUseCase,
  ],
})
export class CurrenciesModule {}
