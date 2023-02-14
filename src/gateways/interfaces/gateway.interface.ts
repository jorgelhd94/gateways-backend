import { IDevice } from 'src/devices/interfaces/device.interface';

export interface IGateway {
  _id?: string;
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: IDevice[];
}
