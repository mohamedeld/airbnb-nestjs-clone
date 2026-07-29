import { Exclude, Expose } from 'class-transformer';

export class CountryResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  countryCode?: string;

  @Exclude()
  __v: number;
}
