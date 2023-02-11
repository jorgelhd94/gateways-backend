import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop({ required: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  status: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
