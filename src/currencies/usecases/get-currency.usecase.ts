import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CurrencyRepository } from '../repository/currency.repository';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

@Injectable()
export class GetCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string) {
    const currency = await this.currencyRepository.findById(id);
    if (!currency) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CURRENCY_NOT_FOUND'),
      );
    }
    return plainToInstance(CurrencyResponseDto, currency);
  }
}
