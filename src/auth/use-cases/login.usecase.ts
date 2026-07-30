import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';
import { LoginAsUserUseCase } from './login-as-user.usecase';
import { LoginAsSystemAdminUseCase } from './login-as-system-admin.usecase';
import { Roles } from 'src/common/constants';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly loginAsUserUseCase: LoginAsUserUseCase,
    private loginAsSystemAdminUseCase: LoginAsSystemAdminUseCase,
  ) {}

  async execute(body: LoginDto): Promise<ResopnseUserDto> {
    if (body.role?.includes(Roles.USER)) {
      return await this.loginAsUserUseCase.execute(body);
    }
    return await this.loginAsSystemAdminUseCase.execute(body);
  }
}
