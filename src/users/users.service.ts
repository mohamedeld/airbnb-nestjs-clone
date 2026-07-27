import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import bcrypt from 'bcryptjs';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly customI18n: CustomI18nService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async createUser(body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }
  async findOne(query: QueryFilter<User>) {
    return await this.userModel.findOne(query);
  }
}
