import { IGateway } from 'src/gateways/interfaces/gateway.interface';

export interface IDevice {
  id?: string;
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: 'online' | 'offline';
  gatewayId: IGateway;
}
