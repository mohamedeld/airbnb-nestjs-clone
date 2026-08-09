import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyForgetPasswordOtpDto {
  @ApiProperty({
    description: 'Email address that received the forget-password OTP',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Forget-password OTP code', example: '123456' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
