import { Exclude, Expose } from 'class-transformer';
import { Roles } from 'src/common/constants';

export class ResopnseUserDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  role: (typeof Roles)[keyof typeof Roles];

  @Expose()
  password: string;

  @Exclude()
  __v: number;

  @Exclude()
  isDeleted: boolean;
}
