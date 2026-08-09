import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { SendForgetPasswordOtpDto } from './dtos/send-forget-password.dto';
import { VerifyForgetPasswordOtpDto } from './dtos/verify-forget-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post('/send')
  @HttpCode(HttpStatus.NO_CONTENT)
  async sendForgetPasswordOtp(
    @Body() body: SendForgetPasswordOtpDto,
  ): Promise<void> {
    await this.forgetPasswordService.sendForgetPasswordOtp(body.email);
  }

  @Post('/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyForgetPasswordOtp(
    @Body() dto: VerifyForgetPasswordOtpDto,
  ): Promise<void> {
    await this.forgetPasswordService.verifyForgetPasswordOtp(dto);
  }

  @Post('/reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.forgetPasswordService.resetPassword(dto);
  }
}
