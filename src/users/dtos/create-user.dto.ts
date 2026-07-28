import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Mohamed Elrfaay',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
