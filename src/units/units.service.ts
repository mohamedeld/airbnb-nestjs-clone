import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './usecases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UpdateUnitUseCase } from './usecases/update-unit.usecase';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { FindByIdUnitUseCase } from './usecases/find-by-id.usecase';
import { QueryFilter } from 'mongoose';
import { Unit } from './schema/unit.schema';
import { FindOneUnitUseCase } from './usecases/find-one-unit.usecase';
import { FindAllUnitsUseCase } from './usecases/find-all-usecase';
import { FindAllUnitsDto } from './dtos/find-all-unit.dto';
import { PaginatedResult } from 'src/common/data-access';
import { DeleteUnitUseCase } from './usecases/delete-unit.usecase';
import { FindAllByUserUseCase } from './usecases/find-all-user-units.usecase';
import { ActivateUnitUseCase } from './usecases/activate-unit.usecase';
import { DeActivateUnitUseCase } from './usecases/deactivate-unit.usecase';

@Injectable()
export class UnitsService {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly findUnitByIdUseCase: FindByIdUnitUseCase,
    private readonly findOneUnitUseCase: FindOneUnitUseCase,
    private readonly findAllUnitsUsecase: FindAllUnitsUseCase,
    private readonly deleteUnitUseCase: DeleteUnitUseCase,
    private readonly findAllByUserUseCase: FindAllByUserUseCase,
    private readonly activateUnitUseCase: ActivateUnitUseCase,
    private readonly deActivateUnitUseCase: DeActivateUnitUseCase,
  ) {}

  async createUnit(
    body: CreateUnitDto,
    user: ICurrentUser,
  ): Promise<UnitResponseDto> {
    return await this.createUnitUseCase.execute(body, user);
  }

  async updateUnit(
    id: string,
    body: UpdateUnitDto,
    user: ICurrentUser,
  ): Promise<UnitResponseDto> {
    return await this.updateUnitUseCase.execute(id, body, user);
  }

  async findById(id: string): Promise<UnitResponseDto> {
    return await this.findUnitByIdUseCase.execute(id);
  }
  async findOne(query: QueryFilter<Unit>): Promise<UnitResponseDto> {
    return await this.findOneUnitUseCase.execute(query);
  }

  async findAll(
    query: FindAllUnitsDto,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return await this.findAllUnitsUsecase.execute(query);
  }

  async deleteUnit(unitId: string, currentUser: ICurrentUser): Promise<void> {
    return await this.deleteUnitUseCase.execute(unitId, currentUser);
  }

  async findAllByUser(
    query: FindAllUnitsDto,
    currentUser: ICurrentUser,
  ): Promise<PaginatedResult<UnitResponseDto>> {
    return await this.findAllByUserUseCase.execute(query, currentUser);
  }

  async activateUnit(id: string, user: ICurrentUser): Promise<UnitResponseDto> {
    return await this.activateUnitUseCase.execute(id, user);
  }
  async deactivateUnit(
    id: string,
    user: ICurrentUser,
  ): Promise<UnitResponseDto> {
    return await this.deActivateUnitUseCase.execute(id, user);
  }
}
