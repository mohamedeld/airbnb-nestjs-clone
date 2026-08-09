import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendOtp(@Body() body: SendOtpDto): Promise<void> {
    return await this.otpService.sendOtp(body.email);
  }

  @Post('/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyOtp(@Body() body: VerifyOtpDto): Promise<void> {
    await this.otpService.verifyOtp(body);
  }
}
