import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { City } from 'src/cities/schema/city.schema';
import { Country } from 'src/countries/schema/country.schema';
import { UnitCategories } from 'src/unit-categories/schema/unit-categories-schema.dto';
import { User } from 'src/users/schemas/user.schema';

export type UnitDocument = HydratedDocument<Unit>;

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true, minlength: 5, maxlength: 100 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  photos: string[];

  @Prop({ required: true })
  costPerDay: number;

  @Prop({ required: true, default: true })
  availability: boolean;

  @Prop({ required: true, ref: Country.name })
  country: string;

  @Prop({ required: true, ref: City.name })
  city: string;

  @Prop({ required: true, ref: UnitCategories.name })
  unitCategory: string;

  @Prop({ required: true, ref: User.name })
  user: string;

  @Prop({ required: true })
  roomsCount: number;

  @Prop({ required: true })
  kidsCount: number;

  @Prop({ required: true })
  adultsCount: number;

  @Prop({ required: true, default: false })
  hasInternetService: boolean;

  @Prop({ required: true, default: false })
  hasKitchen: boolean;

  @Prop({ required: true, default: false })
  hasPrivateGarage: boolean;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
