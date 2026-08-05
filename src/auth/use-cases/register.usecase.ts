import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from '../dtos/sign-up.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private generateToken: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto) {
    const createdUser = await this.userService.createUser(body);
    const token = await this.generateToken.execute({
      id: createdUser?.id?.toString(),
      role: createdUser?.role,
      sub: createdUser?.id?.toString(),
    });
    return { ...createdUser, ...token };
  }
}
