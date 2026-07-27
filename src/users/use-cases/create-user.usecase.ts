import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../schemas/user.schema';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ResopnseUserDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly customI18n: CustomI18nService,
  ) {}
  async execute(body: CreateUserDto): Promise<ResopnseUserDto> {
    const existingEmailUser = await this.userModel.findOne({
      email: body?.email,
    });
    if (existingEmailUser) {
      throw new BadRequestException(
        this.customI18n.translate('validation.EMAIL_ALREADY_EXISTS'),
      );
    }
    const existingPhoneUser = await this.userModel.findOne({
      phoneNumber: body?.phoneNumber,
    });
    if (existingPhoneUser) {
      throw new BadRequestException(
        this.customI18n.translate('validation.PHONE_ALREADY_EXISTS'),
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const createdUser = await this.userModel.create({
      ...body,
      password: hashPassword,
    });
    return plainToInstance(ResopnseUserDto, createdUser.toObject());
  }
}
