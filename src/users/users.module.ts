import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, CustomI18nService, CreateUserUseCase],
  exports: [UsersService],
})
export class UsersModule {}
