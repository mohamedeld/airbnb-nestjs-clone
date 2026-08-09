import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { ForgetPassword } from '../schema/forget-password.schema';

@Injectable()
export class ForgetPasswordRepository extends BaseRepository<ForgetPassword> {
  constructor(
    @InjectModel(ForgetPassword.name)
    private readonly forgetPasswordModel: Model<
      HydratedDocument<ForgetPassword>
    >,
  ) {
    super(forgetPasswordModel);
  }
}
