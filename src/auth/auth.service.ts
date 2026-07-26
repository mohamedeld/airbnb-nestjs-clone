import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  signUp(body: RegisterDto) {
    return this.userService.createUser(body);
  }
}
