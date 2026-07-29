import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from '../schema/city.schema';

@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {
    super(cityModel);
  }
}
