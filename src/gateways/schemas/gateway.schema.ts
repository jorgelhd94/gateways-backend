import { Schema, model } from 'mongoose';
import { DeviceModel } from 'src/devices/schemas/device.schema';
import { IGateway } from '../interfaces/gateway.interface';

const gatewaySchema = new Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  ipAddress: {
    type: String,
    required: true,
    validate:
      /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
  },
  devices: [DeviceModel.schema],
});

export const GatewayModel = model<IGateway>('Gateway', gatewaySchema);
