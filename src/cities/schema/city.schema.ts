import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Country } from 'src/countries/schema/country.schema';

export type CityDocument = HydratedDocument<City>;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, ref: Country.name })
  country: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
