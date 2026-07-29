import { Injectable } from '@nestjs/common';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class SoftDeleteCurrencyUseCase {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly customI18nService: CustomI18nService,
  ) {}

  async execute(id: string): Promise<void> {
    const currency = await this.currencyRepository.findById(id);
    if (!currency) {
      throw new BadRequestException(
        this.customI18nService.translate('validation.CURRENCY_NOT_FOUND'),
      );
    }
    await this.currencyRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
