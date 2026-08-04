import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import type { IPrincipal } from 'src/auth/interfaces/princapal.interace';
import { Allowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants';
import { FindUnitByIdDto } from './dtos/find-unit-by-id.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { PaginatedResult } from 'src/common/data-access';
import { FindAllUnitsDto } from './dtos/find-all-unit.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createValidationFactory } from 'src/common/files/files-validation-factory';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Controller('units')
export class UnitsController {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly fileUploadService: FilesUploadService,
  ) {}

  @Allowed([Roles.USER])
  @UseInterceptors(FilesInterceptor('photos', 10))
  @Post('create')
  async createUnit(
    @Body() body: CreateUnitDto,
    @UploadedFiles(
      createValidationFactory({
        maxSize: 1024 * 1024 * 2,
        fileType: 'image/jpeg|image/png|image/jpg',
      }),
    )
    images: Express.Multer.File[],
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<UnitResponseDto> {
    const photos = await this.fileUploadService.uploadSingleFile(images[0]);
    body.photos = [photos];
    return await this.unitsService.createUnit(body, currentAccount?.user);
  }

  @Get('/:id')
  async getUnitById(@Param() param: FindUnitByIdDto): Promise<UnitResponseDto> {
    return await this.unitsService.findById(param.id);
  }

  @Allowed([Roles.USER])
  @Patch('/:id')
  async updateUnit(
    @Param() param: FindUnitByIdDto,
    @Body() body: UpdateUnitDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<UnitResponseDto> {
    console.log('param.id', param.id);

    return await this.unitsService.updateUnit(
      param?.id,
      body,
      currentAccount?.user,
    );
  }
  @Get()
  async findAll(
    @Query() query: FindAllUnitsDto,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return await this.unitsService.findAll(query);
  }

  @Allowed([Roles.USER])
  @Get('/user/me')
  async findAllByUser(
    @Query() query: FindAllUnitsDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return await this.unitsService.findAllByUser(query, currentAccount?.user);
  }

  @Allowed([Roles.USER])
  @Delete('/:id')
  async deleteUnit(
    @Param() param: FindUnitByIdDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ) {
    return await this.unitsService.deleteUnit(param?.id, currentAccount?.user);
  }

  @Allowed([Roles.USER])
  @Patch('/:id/activate')
  async activateUnit(
    @Param() param: FindUnitByIdDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<UnitResponseDto> {
    return await this.unitsService.activateUnit(
      param?.id,
      currentAccount?.user,
    );
  }

  @Allowed([Roles.USER])
  @Patch('/:id/deactivate')
  async deActivateUnit(
    @Param() param: FindUnitByIdDto,
    @CurrentAccount() currentAccount: IPrincipal,
  ): Promise<UnitResponseDto> {
    return await this.unitsService.deactivateUnit(
      param?.id,
      currentAccount?.user,
    );
  }
}
