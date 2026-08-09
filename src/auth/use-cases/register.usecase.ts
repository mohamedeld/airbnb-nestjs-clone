import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from '../dtos/sign-up.dto';
import { GenerateTokenUseCase } from './generate-token.usecase';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private generateToken: GenerateTokenUseCase,
    private readonly otpService: OtpService,
  ) {}

  async execute(body: RegisterDto) {
    const createdUser = await this.userService.createUser(body);
    const token = await this.generateToken.execute({
      id: createdUser?.id?.toString(),
      role: createdUser?.role,
      sub: createdUser?.id?.toString(),
    });
    await this.otpService.sendOtp(createdUser.email);
    return { ...createdUser, ...token };
  }
}
