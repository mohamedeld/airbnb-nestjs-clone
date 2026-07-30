import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../repositories/app-settings.repository';
import { plainToInstance } from 'class-transformer';
import { AppSettingResponseDto } from '../dtos/app-setting.reponse.dto';

@Injectable()
export class GetUpsertAppSettingsUseCase {
  constructor(private readonly appSettingsRepository: AppSettingsRepository) {}

  async execute(): Promise<AppSettingResponseDto> {
    const appSettings = await this.appSettingsRepository.findOne({});
    return plainToInstance(AppSettingResponseDto, appSettings);
  }
}
