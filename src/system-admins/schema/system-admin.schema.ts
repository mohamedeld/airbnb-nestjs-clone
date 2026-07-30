import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SystemAdminDocument = HydratedDocument<SystemAdmin>;

@Schema({ timestamps: true })
export class SystemAdmin {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isSuperAdmin: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const SystemAdminSchema = SchemaFactory.createForClass(SystemAdmin);
