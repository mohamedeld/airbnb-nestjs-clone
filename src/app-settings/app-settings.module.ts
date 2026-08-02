import { Module } from '@nestjs/common';
import { AppSettingsController } from './app-settings.controller';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsRepository } from './repositories/app-settings.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettings, AppSettingsSchema } from './schema/app-settings.schema';
import { UpsertAppSettingsUseCase } from './usecases/upsert-app-settings.usecase';
import { GetUpsertAppSettingsUseCase } from './usecases/get-upsert-app-settings.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppSettings.name, schema: AppSettingsSchema },
    ]),
  ],
  controllers: [AppSettingsController],
  providers: [
    AppSettingsService,
    AppSettingsRepository,
    UpsertAppSettingsUseCase,
    GetUpsertAppSettingsUseCase,
  ],
  exports: [AppSettingsService],
})
export class AppSettingsModule {}
