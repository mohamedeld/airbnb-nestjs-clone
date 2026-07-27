import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/sign-up.dto';

import { LoginDto } from './dtos/login.dto';

import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RegisterUseCase } from './use-cases/register.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}
  async signUp(body: RegisterDto): Promise<ResopnseUserDto> {
    return this.registerUseCase.execute(body);
  }

  async login(body: LoginDto): Promise<ResopnseUserDto> {
    return this.loginUseCase.execute(body);
  }

  async refreshToken(body: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(body);
  }
}
