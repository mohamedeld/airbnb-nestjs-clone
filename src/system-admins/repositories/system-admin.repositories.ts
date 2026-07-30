import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/data-access';
import { SystemAdmin } from '../schema/system-admin.schema';

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> {
  constructor(
    @InjectModel(SystemAdmin.name) private systemAdminModel: Model<SystemAdmin>,
  ) {
    super(systemAdminModel);
  }
}
