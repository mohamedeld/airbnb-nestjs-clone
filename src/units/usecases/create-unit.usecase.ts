import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { ICurrentUser } from 'src/auth/interfaces/princapal.interace';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly unitValidationUseCase: UnitValidationUseCase,
  ) {}
  async execute(
    body: CreateUnitDto,
    currentUser: ICurrentUser,
  ): Promise<UnitResponseDto> {
    await this.unitValidationUseCase.execute(body);
    const unit = await this.unitRepository.create({
      ...body,
      user: currentUser?._id,
    });
    return plainToInstance(UnitResponseDto, unit.toObject());
  }
}
