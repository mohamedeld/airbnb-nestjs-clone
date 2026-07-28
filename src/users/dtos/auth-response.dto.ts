import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '6a6726c8d059e99f9b35b478',
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Mohamed',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'mohamedd1232u@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'User phone number',
    example: '01899658797',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}
