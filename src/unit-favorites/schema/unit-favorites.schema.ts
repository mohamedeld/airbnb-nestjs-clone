import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit } from 'src/units/schema/unit.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class UnitFavorite {
  @Prop({ required: true, ref: Unit.name })
  unit: string;

  @Prop({ required: true, ref: User.name })
  user: string;
}

export const UnitFavoriteSchema = SchemaFactory.createForClass(UnitFavorite);

UnitFavoriteSchema.index({ unit: 1, user: 1 }, { unique: true });
