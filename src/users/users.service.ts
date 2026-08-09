import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ClientSession, Model, QueryFilter, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { ResopnseUserDto } from './dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserRawUseCase } from './use-cases/update-user-raw.usecase';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly customI18n: CustomI18nService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserRawUseCase: UpdateUserRawUseCase,
  ) {}

  async createUser(body: CreateUserDto): Promise<ResopnseUserDto> {
    return this.createUserUseCase.execute(body);
  }

  async findOne(query: QueryFilter<User>): Promise<ResopnseUserDto> {
    const user = await this.userModel.findOne(query);
    return plainToInstance(ResopnseUserDto, user?.toObject());
  }

  async updateUserRaw(
    query: UpdateQuery<User>,
    data: Record<string, any>,
    session?: ClientSession,
  ): Promise<void> {
    return this.updateUserRawUseCase.execute(query, data, session);
  }
}
