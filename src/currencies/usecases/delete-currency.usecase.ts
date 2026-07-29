import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class DeleteCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!currency) {
      throw new BadRequestException(
        this.customI18n.translate('validation.CURRENCY_NOT_FOUND'),
      );
    }
    await this.currencyRepository.findByIdAndDelete(id);
  }
}
