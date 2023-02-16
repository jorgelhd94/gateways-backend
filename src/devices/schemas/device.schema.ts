import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Gateway } from '../../gateways/schemas/gateway.schema';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop({ required: true, unique: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  status: 'online' | 'offline';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  gatewayId: Gateway;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
