import { Schema, model } from 'mongoose';
import { IDevice } from '../interfaces/device.interface';

const deviceSchema = new Schema({
  uid: { type: Number, required: true },
  vendor: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  status: { type: String, required: true },
});

export const DeviceModel = model<IDevice>('Device', deviceSchema);
