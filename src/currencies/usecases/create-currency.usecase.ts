import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { plainToInstance } from 'class-transformer';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyRepository } from '../repository/currency.repository';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';

@Injectable()
export class CreateCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.currencyRepository.findOne({
      name: body.name,
    });
    if (existingCurrency) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CURRENCY_EXIST'),
      );
    }
    const createdCurrency = await this.currencyRepository.create(body);
    return plainToInstance(CurrencyResponseDto, createdCurrency.toObject());
  }
}
