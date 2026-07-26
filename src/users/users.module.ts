import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, CustomI18nService],
  exports: [UsersService],
})
export class UsersModule {}
