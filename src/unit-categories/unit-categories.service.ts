import { Injectable } from '@nestjs/common';
import { CreateUnitCategoriesUseCase } from './usecases/create-unit-categories.usecase';
import { GetUnitCategoriesUseCase } from './usecases/get-unit-categories.usecase';
import { SoftDeleteUnitCategoriesUseCase } from './usecases/soft-delete-unit-categories.usecase';
import { UpdateUnitCategoriesUseCase } from './usecases/update-unit-categories.usecases';
import { CreateUnitCategoriesDto } from './dtos/create-unit-categories.dto';
import { UnitCategoriesResponseDto } from './dtos/unit-categories-response.dto';
import { DeleteUnitCategoriesUseCase } from './usecases/delete-unit-categories.usecase';
import { FindAllUnitCategoriesUseCase } from './usecases/final-all-unit-categories.usecase';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';

@Injectable()
export class UnitCategoriesService {
  constructor(
    private readonly createUnitCategoriesUseCase: CreateUnitCategoriesUseCase,
    private readonly getUnitCategoriesUseCase: GetUnitCategoriesUseCase,
    private readonly findAllUnitCategoriesUseCase: FindAllUnitCategoriesUseCase,
    private readonly softDeleteUnitCategoriesUseCase: SoftDeleteUnitCategoriesUseCase,
    private readonly updateUnitCategoriesUseCase: UpdateUnitCategoriesUseCase,
    private readonly deleteUnitCategoriesUseCase: DeleteUnitCategoriesUseCase,
  ) {}

  async createUnitCategories(
    body: CreateUnitCategoriesDto,
  ): Promise<UnitCategoriesResponseDto> {
    return await this.createUnitCategoriesUseCase.execute(body);
  }
  async getUnitCategoriesById(id: string): Promise<UnitCategoriesResponseDto> {
    return await this.getUnitCategoriesUseCase.execute(id);
  }

  async getAllUnitCategories(query: FindAllUnitCategoriesDto) {
    return this.findAllUnitCategoriesUseCase.execute(query);
  }
  async updateUnitCategories(
    id: string,
    body: CreateUnitCategoriesDto,
  ): Promise<UnitCategoriesResponseDto> {
    return await this.updateUnitCategoriesUseCase.execute(id, body);
  }
  async softDeleteUnitCategories(id: string): Promise<void> {
    return await this.softDeleteUnitCategoriesUseCase.execute(id);
  }
  async deleteUnitCategories(id: string): Promise<void> {
    return await this.deleteUnitCategoriesUseCase.execute(id);
  }
}
