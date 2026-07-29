import { Expose } from 'class-transformer';

export class CityResponseDto {
  @Expose({ name: 'id' })
  _id: string;

  @Expose()
  name: string;

  @Expose()
  country: string;
}
