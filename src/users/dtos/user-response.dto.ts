import { Exclude, Expose } from 'class-transformer';

export class ResopnseUserDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
