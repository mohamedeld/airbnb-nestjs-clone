import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import { SystemAdminRepository } from '../repositories/system-admin.repositories';
import {
  IEnvironment,
  ISystemAdmin,
} from 'src/common/configration/environment.interface';

@Injectable()
export class InitializeSystemAdminUseCase {
  constructor(
    private readonly systemAdminRepository: SystemAdminRepository,
    private readonly configService: ConfigService<IEnvironment>,
  ) {}

  async execute(): Promise<void> {
    const systemAdminConfig =
      this.configService.getOrThrow<ISystemAdmin>('systemAdmin');
    const systemAdmin = await this.systemAdminRepository.findOne({
      email: systemAdminConfig?.email,
    });
    if (systemAdmin) {
      return;
    }
    const hashedPassword = await bcrypt.hash(systemAdminConfig?.password, 10);
    await this.systemAdminRepository.create({
      name: systemAdminConfig?.name,
      email: systemAdminConfig?.email,
      password: hashedPassword,
      isSuperAdmin: true,
    });
  }
}
