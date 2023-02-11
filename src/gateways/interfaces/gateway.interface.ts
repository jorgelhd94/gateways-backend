import { IDevice } from 'src/devices/interfaces/device.interface';

export interface IGateway {
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: IDevice[];
}
