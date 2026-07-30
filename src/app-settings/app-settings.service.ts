import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './usecases/upsert-app-settings.usecase';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { GetUpsertAppSettingsUseCase } from './usecases/get-upsert-app-settings.usecase';
import { AppSettingResponseDto } from './dtos/app-setting.reponse.dto';

@Injectable()
export class AppSettingsService {
  constructor(
    private readonly upsertAppSetting: UpsertAppSettingsUseCase,
    private readonly findUpsertAppSetting: GetUpsertAppSettingsUseCase,
  ) {}

  async upsertAppSettings(body: UpsertAppSettingDto) {
    return await this.upsertAppSetting.execute(body);
  }

  async getAppSettings(): Promise<AppSettingResponseDto> {
    return await this.findUpsertAppSetting.execute();
  }
}
