import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit } from '../schema/unit.schema';

@Injectable()
export class UnitRepository extends BaseRepository<Unit> {
  constructor(@InjectModel(Unit.name) private unitModel: Model<Unit>) {
    super(unitModel);
  }
}
