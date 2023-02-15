import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IGateway } from '../interfaces/gateway.interface';
import { Device } from 'src/devices/schemas/device.schema';
import { User } from 'src/auth/schemas/user.schema';

export type GatewayDocument = HydratedDocument<IGateway>;
const ipv4Validation =
  /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

@Schema()
export class Gateway {
  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, validate: ipv4Validation })
  ipAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }])
  devices: [Device];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
