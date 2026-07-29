import { Exclude, Expose } from 'class-transformer';

export class CityResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  country: string;

  @Exclude()
  __v: number;
}
