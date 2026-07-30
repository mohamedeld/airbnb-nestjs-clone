import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { SystemAdminRepository } from './repositories/system-admin.repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdmin, SystemAdminSchema } from './schema/system-admin.schema';
import { InitializeSystemAdminUseCase } from './usecase/initialize-system-admin.usecase';
import { FindOneSystemAdminUseCase } from './usecase/find-one-system-admin.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SystemAdmin.name, schema: SystemAdminSchema },
    ]),
  ],
  providers: [
    SystemAdminsService,
    SystemAdminRepository,
    InitializeSystemAdminUseCase,
    FindOneSystemAdminUseCase,
  ],
  exports: [SystemAdminsService],
})
export class SystemAdminsModule {}
