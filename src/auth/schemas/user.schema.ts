import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/IUser.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<IUser>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
