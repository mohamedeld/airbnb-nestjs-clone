import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Constants } from 'src/common/swagger';

@ApiTags(Constants.USERS)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
