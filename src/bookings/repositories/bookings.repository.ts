import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/data-access';
import { Booking } from '../schemas/bookings.schema';

@Injectable()
export class BookingsRepository extends BaseRepository<Booking> {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {
    super(bookingModel);
  }
}
