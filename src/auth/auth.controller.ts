import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';
import { SignupSwagger } from './swagger/register.swagger';
import { LoginSwagger } from './swagger/login.swagger';
import { AccessTokenSwagger } from './swagger/access-token.swagger';
import { Constants } from 'src/common/swagger';

@ApiTags(Constants.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SignupSwagger()
  @Post('sign-up')
  async signUp(@Body() body: RegisterDto): Promise<ResopnseUserDto> {
    return await this.authService.signUp(body);
  }

  @LoginSwagger()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<ResopnseUserDto> {
    return await this.authService.login(body);
  }

  @AccessTokenSwagger()
  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }
}
