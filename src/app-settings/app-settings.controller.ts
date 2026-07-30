import { Body, Controller, Get, Put } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { AppSettingResponseDto } from './dtos/app-setting.reponse.dto';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Put()
  async upsertAppSettings(@Body() body: UpsertAppSettingDto) {
    return await this.appSettingsService.upsertAppSettings(body);
  }

  @Get()
  async findAppSettings(): Promise<AppSettingResponseDto> {
    return await this.appSettingsService.getAppSettings();
  }
}
