import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency } from '../schema/currency-schema.dto';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<Currency>,
  ) {
    super(currencyModel);
  }
}
