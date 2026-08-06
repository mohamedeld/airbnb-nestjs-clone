import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Booking } from 'src/bookings/schemas/bookings.schema';
import { Unit } from 'src/units/schema/unit.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class UnitReviews {
  @Prop({ required: true, ref: Booking.name })
  booking: string;

  @Prop({ required: true, ref: Unit.name })
  unit: string;

  @Prop({ required: true, ref: User.name })
  guest: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  comment?: string;
}

export const UnitReviewsSchema = SchemaFactory.createForClass(UnitReviews);
