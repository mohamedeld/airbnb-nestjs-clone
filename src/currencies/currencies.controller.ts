import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { FindCurrencyByIdDto } from './dtos/find-currency-by-id.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { Allowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Allowed([Roles.SYSTEM_ADMIN])
  @Post('create')
  async createCurrency(@Body() body: CreateCurrencyDto) {
    return await this.currenciesService.createCurrency(body);
  }

  @Get()
  async getCurrencies(@Query() query: FindAllCurrenciesDto) {
    return await this.currenciesService.getCurrencies(query);
  }

  @Get('/:id')
  async getCurrency(@Param() param: FindCurrencyByIdDto) {
    return await this.currenciesService.getCurrencyById(param.id);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Patch('/:id')
  async updateCurrency(
    @Param() param: FindCurrencyByIdDto,
    @Body() body: CreateCurrencyDto,
  ) {
    return await this.currenciesService.updateCurrencies(param.id, body);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Delete('/soft-delete/:id')
  async softDeleteCurrency(@Param() param: FindCurrencyByIdDto) {
    return await this.currenciesService.softDeleteCurrency(param.id);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Delete('/:id')
  async deleteCurrency(@Param() param: FindCurrencyByIdDto) {
    return await this.currenciesService.deleteCurrency(param.id);
  }
}
