import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryFilter } from 'mongoose';
import { PaginatedResult } from 'src/common/data-access';
import { CurrencyRepository } from '../repository/currency.repository';
import { FindAllCurrenciesDto } from '../dtos/find-all-currencies.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { Currency } from '../schema/currency-schema.dto';

@Injectable()
export class GetCurrenciesUseCase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    const matchQuery: QueryFilter<Currency> = { isDeleted: false };
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;

    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query?.currencyCode) {
      matchQuery.currencyCode = { $regex: query.currencyCode, $options: 'i' };
    }

    const result = await this.currencyRepository.findPaginated(matchQuery, {
      page,
      limit,
    });
    return plainToInstance(PaginatedResult<CurrencyResponseDto>, result);
  }
}
