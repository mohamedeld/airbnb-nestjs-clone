import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CurrencyRepository } from '../repository/currency.repository';
import { Currency } from '../schema/currency-schema.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

@Injectable()
export class UpdateCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(
    id: string,
    body: Partial<Currency>,
  ): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findById(id);
    if (!currency) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CURRENCY_NOT_FOUND'),
      );
    }
    if (body?.name) {
      const existingCurrency = await this.currencyRepository.findOne({
        name: body.name,
        _id: { $ne: id },
        isDeleted: { $ne: true },
      });
      if (existingCurrency) {
        throw new BadRequestException(
          this.customI18n.translate('validation.CURRENCY_EXIST'),
        );
      }
    }
    const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
      id,
      body,
    );
    return plainToInstance(CurrencyResponseDto, updatedCurrency?.toObject());
  }
}
