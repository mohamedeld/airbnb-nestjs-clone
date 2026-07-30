import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitializeSystemAdminUseCase } from './usecase/initialize-system-admin.usecase';
import { FindOneSystemAdminUseCase } from './usecase/find-one-system-admin.usecase';
import { SystemAdminLResponseDto } from './dtos/system-admin-reponse.dto';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from './schema/system-admin.schema';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    private readonly initializeSystemAdmin: InitializeSystemAdminUseCase,
    private readonly findOneSystemAdminUseCase: FindOneSystemAdminUseCase,
  ) {}
  async onModuleInit() {
    await this.initializeSystemAdmin.execute();
  }

  async findOne(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminLResponseDto> {
    return await this.findOneSystemAdminUseCase.execute(query);
  }
}
