import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/data-access';
import { Country } from '../schema/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(@InjectModel(Country.name) private countryModel: Model<Country>) {
    super(countryModel);
  }
}
