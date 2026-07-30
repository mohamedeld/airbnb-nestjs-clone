import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/data-access';
import { AppSettings } from '../schema/app-settings.schema';

@Injectable()
export class AppSettingsRepository extends BaseRepository<AppSettings> {
  constructor(
    @InjectModel(AppSettings.name) private appSettingsModel: Model<AppSettings>,
  ) {
    super(appSettingsModel);
  }
}
