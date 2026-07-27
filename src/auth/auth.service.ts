import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly customI18n: CustomI18nService,
  ) {}
  async signUp(body: RegisterDto) {
    const createdUser = await this.userService.createUser(body);
    const token = await this.generateTokens(createdUser?._id?.toString());
    return { ...token };
  }

  async login(body: LoginDto) {
    const existUser = await this.userService.findOne({ email: body?.email });
    if (!existUser) {
      throw new NotFoundException(
        this.customI18n.translate('validation.INVALID_CREDENTIALS'),
      );
    }
    const isPasswordMatched = await bcrypt.compare(
      body.password,
      existUser.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException(
        this.customI18n.translate('validation.INVALID_CREDENTIALS'),
      );
    }
    return await this.generateTokens(existUser?._id?.toString());
  }

  private async generateTokens(userId: string) {
    const payload = { sub: userId };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
