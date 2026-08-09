import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'user@example.com',
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: 'Sender email address',
    example: 'support@airbnb.com',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Welcome to Airbnb Clone',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Plain text email body',
    example: 'Welcome to Airbnb Clone.',
  })
  @IsString()
  text: string;
}
