import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { SystemAdminRepository } from './repositories/system-admin.repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdmin, SystemAdminSchema } from './schema/system-admin.schema';
import { InitializeSystemAdminUseCase } from './usecase/initialize-system-admin.usecase';
import { FindOneSystemAdminUseCase } from './usecase/find-one-system-admin.usecase';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

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
    CustomI18nService,
  ],
  exports: [SystemAdminsService],
})
export class SystemAdminsModule {}
