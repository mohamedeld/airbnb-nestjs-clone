import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: RegisterDto): Promise<ResopnseUserDto> {
    return await this.authService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<ResopnseUserDto> {
    return await this.authService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }
}
