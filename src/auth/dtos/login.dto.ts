import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../common/constants';
export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role',
    enum: Roles,
    type: 'string',
    example: Roles.USER,
  })
  @IsNotEmpty()
  role: (typeof Roles)[keyof typeof Roles];
}
