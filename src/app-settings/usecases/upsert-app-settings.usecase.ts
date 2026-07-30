import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repositories/app-settings.repository';
import { UpsertAppSettingDto } from '../dtos/upsert-app-settings.dto';
import { AppSettingResponseDto } from '../dtos/app-setting.reponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpsertAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}
  async execute(body: UpsertAppSettingDto): Promise<AppSettingResponseDto> {
    const appSettings = await this.appSettingsRepository.findOneAndUpdate(
      {},
      body,
      {
        upsert: true,
      },
    );

    return plainToInstance(AppSettingResponseDto, appSettings?.toObject());
  }
}
