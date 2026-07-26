import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly customI18n: CustomI18nService,
  ) {}

  async createUser(body: CreateUserDto) {
    const existingEmailUser = await this.userModel.findOne({
      email: body?.email,
    });
    if (existingEmailUser) {
      const message = this.customI18n.translate(
        'validation.EMAIL_ALREADY_EXISTS',
      );

      console.log(message);
      throw new BadRequestException(
        this.customI18n.translate('validation.EMAIL_ALREADY_EXISTS'),
      );
    }
    const existingPhoneUser = await this.userModel.findOne({
      phoneNumber: body?.phoneNumber,
    });
    if (existingPhoneUser) {
      const message = this.customI18n.translate(
        'validation.EMAIL_ALREADY_EXISTS',
      );

      console.log(message);
      throw new BadRequestException(
        this.customI18n.translate('validation.PHONE_ALREADY_EXISTS'),
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    await this.userModel.create({
      ...body,
      password: hashPassword,
    });
  }
}
