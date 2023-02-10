import { IDevice } from '../interfaces/device.interface';

export class CreateDeviceDto implements IDevice {
  id?: string;
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: 'online' | 'offline';
}
