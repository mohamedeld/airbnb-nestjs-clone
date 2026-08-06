import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Unit } from 'src/units/schema/unit.schema';
import { User } from 'src/users/schemas/user.schema';
import { BookingStatus } from '../enums/booking-status.enum';
import { GuestReview } from './subdocument/guest-review.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, ref: Unit.name })
  unit: string;

  @Prop({ required: true, ref: User.name })
  guest: string;

  @Prop({ required: true, ref: User.name })
  host: string;

  @Prop({ required: true, type: Date })
  checkIn: number | Date;

  @Prop({ required: true, type: Date })
  checkOut: number | Date;

  @Prop({ required: true })
  daysCount: number;

  @Prop({ required: true })
  pricePerDay: number;

  @Prop({ required: true })
  bookingAmount: number;

  @Prop({ required: true, default: 0 })
  vat: number;

  @Prop({ required: true, default: 0 })
  vatAmount: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  adultsCount?: number;

  @Prop()
  kidsCount?: number;

  @Prop()
  notes?: string;

  @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop()
  cancellationReason?: string;

  @Prop()
  cancellationDate?: Date;

  @Prop()
  guestReview?: GuestReview;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
