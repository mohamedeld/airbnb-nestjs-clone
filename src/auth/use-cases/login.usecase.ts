import bcrypt from 'bcryptjs';

import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UsersService } from 'src/users/users.service';
import { GenerateTokenUseCase } from './generate-token.usecase';
import { NotFoundException } from 'src/common/errors-handling/custom-exceptions/not-found-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { Injectable } from '@nestjs/common';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userService: UsersService,
    private generateTokens: GenerateTokenUseCase,
    private readonly customI18n: CustomI18nService,
  ) {}

  async execute(body: LoginDto): Promise<ResopnseUserDto> {
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
    const token = await this.generateTokens.execute(existUser?._id?.toString());
    const plainedUser = plainToInstance(ResopnseUserDto, existUser.toObject());
    return {
      ...plainedUser,
      ...token,
    };
  }
}
