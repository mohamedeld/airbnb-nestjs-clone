import { Injectable } from '@nestjs/common';
import { CreateCurrencyUseCase } from './usecases/create-currency.usecase';
import { GetCurrencyUseCase } from './usecases/get-currency.usecase';
import { SoftDeleteCurrencyUseCase } from './usecases/soft-delete-currency.usecase';
import { UpdateCurrencyUseCase } from './usecases/update-currency.usecases';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { GetCurrenciesUseCase } from './usecases/final-all-currencies.usecase';
import { DeleteCurrencyUseCase } from './usecases/delete-currency.usecase';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly createCurrencyUseCase: CreateCurrencyUseCase,
    private readonly getCurrencyUseCase: GetCurrencyUseCase,
    private readonly getCurrenciesUseCase: GetCurrenciesUseCase,
    private readonly softDeleteCurrencyUseCase: SoftDeleteCurrencyUseCase,
    private readonly updateCurrencyUseCase: UpdateCurrencyUseCase,
    private readonly deleteCurrencyUseCase: DeleteCurrencyUseCase,
  ) {}

  async createCurrency(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return await this.createCurrencyUseCase.execute(body);
  }
  async getCurrencyById(id: string): Promise<CurrencyResponseDto> {
    return await this.getCurrencyUseCase.execute(id);
  }

  async getCurrencies(query: FindAllCurrenciesDto) {
    return this.getCurrenciesUseCase.execute(query);
  }
  async updateCurrencies(
    id: string,
    body: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return await this.updateCurrencyUseCase.execute(id, body);
  }

  async softDeleteCurrency(id: string): Promise<void> {
    return await this.softDeleteCurrencyUseCase.execute(id);
  }
  async deleteCurrency(id: string): Promise<void> {
    return await this.deleteCurrencyUseCase.execute(id);
  }
}
