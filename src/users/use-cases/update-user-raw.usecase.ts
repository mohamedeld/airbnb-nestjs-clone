import { Injectable } from '@nestjs/common';
import { ClientSession, UpdateQuery } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserRawUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    query: UpdateQuery<User>,
    data: Record<string, any>,
    session?: ClientSession,
  ): Promise<void> {
    await this.userRepository.findOneAndUpdate(query, data, { session });
  }
}
