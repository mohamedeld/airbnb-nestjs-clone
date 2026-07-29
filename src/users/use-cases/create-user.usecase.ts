import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResopnseUserDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../repository/user.repository';
@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customI18n: CustomI18nService,
  ) {}
  async execute(body: CreateUserDto): Promise<ResopnseUserDto> {
    const existingEmailUser = await this.userRepository.findOne({
      email: body?.email,
    });
    if (existingEmailUser) {
      throw new BadRequestException(
        this.customI18n.translate('validation.EMAIL_ALREADY_EXISTS'),
      );
    }
    const existingPhoneUser = await this.userRepository.findOne({
      phoneNumber: body?.phoneNumber,
    });
    if (existingPhoneUser) {
      throw new BadRequestException(
        this.customI18n.translate('validation.PHONE_ALREADY_EXISTS'),
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const createdUser = await this.userRepository.create({
      ...body,
      password: hashPassword,
    });
    return plainToInstance(ResopnseUserDto, createdUser.toObject());
  }
}
