import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Otp } from '../schema/otp.schema';

@Injectable()
export class OtpRepository extends BaseRepository<Otp> {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpModel: Model<HydratedDocument<Otp>>,
  ) {
    super(otpModel);
  }
}
