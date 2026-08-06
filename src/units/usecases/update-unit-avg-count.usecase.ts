import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { ClientSession } from 'mongoose';
import { BadRequestException } from 'src/common/errors-handling/custom-exceptions/bad-request-exception';
import { UpdateUnitAvgRateAndCountDto } from '../dtos/update-unit-avg-rate.dto';

@Injectable()
export class UpdateUnitAvgRateAndCountUseCase {
  constructor(private readonly unitsRepository: UnitRepository) {}

  async execute(
    body: UpdateUnitAvgRateAndCountDto,
    session?: ClientSession,
  ): Promise<void> {
    const unit = await this.unitsRepository.findById(body.unitId, { session });
    if (!unit) throw new BadRequestException('Unit not found');

    await this.unitsRepository.findByIdAndUpdate(
      body.unitId,
      {
        ratingAvg: body.ratingAvg,
        ratingCount: body.ratingCount,
      },
      {
        session,
      },
    );
  }
}
