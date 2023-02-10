import { IDevice } from 'src/devices/interfaces/device.interface';

export interface IGateway extends Document {
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: IDevice[];
}
