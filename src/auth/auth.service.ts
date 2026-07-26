import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  signUp(body: RegisterDto) {
    console.log('resolved lang:', I18nContext.current()?.lang); // 👈 add this

    return this.userService.createUser(body);
  }
}
