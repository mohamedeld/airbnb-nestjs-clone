import { Injectable } from '@nestjs/common';
import { AppSettingsService } from 'src/app-settings/app-settings.service';
import { CitiesService } from 'src/cities/cities.service';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { CountriesService } from 'src/countries/countries.service';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { UnitCategoriesService } from 'src/unit-categories/unit-categories.service';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UpdateUnitDto } from '../dtos/update-unit.dto';

@Injectable()
export class UnitValidationUseCase {
  constructor(
    private readonly appSettingsService: AppSettingsService,
    private readonly citiesService: CitiesService,
    private readonly countriesService: CountriesService,
    private readonly unitCategoriesService: UnitCategoriesService,
    private readonly custom18nService: CustomI18nService,
  ) {}

  async execute(body: CreateUnitDto | UpdateUnitDto): Promise<void> {
    const appSettings = await this.appSettingsService.getAppSettings();
    if (body?.costPerDay < appSettings?.minPrice)
      throw new BadRequestException(
        `${this.custom18nService.translate('validation.APP_SETTING_COST')} ${appSettings.minPrice}`,
      );

    if (body?.city) {
      const city = await this.citiesService.findOne({
        _id: body.city,
      });
      if (!city)
        throw new BadRequestException(
          this.custom18nService.translate('validation.CITY_NOT_FOUND'),
        );
    }

    if (body?.country) {
      const country = await this.countriesService.findOne({
        _id: body.country,
      });
      if (!country)
        throw new BadRequestException(
          this.custom18nService.translate('validation.COUNTRY_NOT_FOUND'),
        );
    }

    if (body?.unitCategory) {
      const unitCategory = await this.unitCategoriesService.findOne({
        _id: body.unitCategory,
      });
      if (!unitCategory)
        throw new BadRequestException(
          this.custom18nService.translate(
            'validation.UnitCategories_NOT_FOUND',
          ),
        );
    }
  }
}
