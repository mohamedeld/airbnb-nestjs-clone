import { Exclude, Expose } from 'class-transformer';

export class UnitCategoriesResponseDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  icon?: string;

  @Exclude()
  __v: number;
}
