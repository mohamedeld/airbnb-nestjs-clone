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
import { CreateUnitCategoriesDto } from './dtos/create-unit-categories.dto';
import { FindUnitCategoriesByIdDto } from './dtos/find-unit-categories-by-id.dto';
import { UnitCategoriesService } from './unit-categories.service';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { Roles } from 'src/common/constants';
import { Allowed } from 'src/auth/decorators/roles.decorator';

@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @Allowed([Roles.SYSTEM_ADMIN])
  @Post('create')
  async createUnitCategories(@Body() body: CreateUnitCategoriesDto) {
    return await this.unitCategoriesService.createUnitCategories(body);
  }

  @Get()
  async getAllUnitCategories(@Query() query: FindAllUnitCategoriesDto) {
    return await this.unitCategoriesService.getAllUnitCategories(query);
  }

  @Get('/:id')
  async getUnitCategories(@Param() param: FindUnitCategoriesByIdDto) {
    return await this.unitCategoriesService.getUnitCategoriesById(param.id);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Patch('/:id')
  async updateUnitCategories(
    @Param() param: FindUnitCategoriesByIdDto,
    @Body() body: CreateUnitCategoriesDto,
  ) {
    return await this.unitCategoriesService.updateUnitCategories(
      param.id,
      body,
    );
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Delete('/soft-delete/:id')
  async softDeleteUnitCategories(@Param() param: FindUnitCategoriesByIdDto) {
    return await this.unitCategoriesService.softDeleteUnitCategories(param.id);
  }

  @Allowed([Roles.SYSTEM_ADMIN])
  @Delete('/:id')
  async deleteUnitCategories(@Param() param: FindUnitCategoriesByIdDto) {
    return await this.unitCategoriesService.deleteUnitCategories(param.id);
  }
}
