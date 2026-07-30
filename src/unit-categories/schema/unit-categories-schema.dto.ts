import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UnitCategoriesDocument = HydratedDocument<UnitCategories>;

@Schema({ timestamps: true })
export class UnitCategories {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: '' })
  icon?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UnitCategoriesSchema =
  SchemaFactory.createForClass(UnitCategories);
