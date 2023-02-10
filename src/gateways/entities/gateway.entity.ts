import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gateway extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  serialNumber: string;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({})
  ipAddress: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
