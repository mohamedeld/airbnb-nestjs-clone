import { Exclude, Expose } from 'class-transformer';

export class CurrencyResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  currencyCode?: string;

  @Exclude()
  __v: number;
}
