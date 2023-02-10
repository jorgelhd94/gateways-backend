import { IGateway } from 'src/gateways/interfaces/gateway.interface';
import { GatewayModel } from './../gateways/schemas/gateway.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DevicesService {
  async addDevice(
    gatewayId: string,
    device: CreateDeviceDto,
  ): Promise<IGateway> {
    const gateway = await GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new Error('Gateway not found');
    }

    if (gateway.devices.length >= 10) {
      throw new Error('Exceeded the maximum number of allowed devices');
    }

    gateway.devices.push(device);
    return await gateway.save();
  }

  async removeDevice(gatewayId: string, deviceId: string): Promise<IGateway> {
    const gateway = await GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new Error('Gateway not found');
    }

    const deviceIndex = gateway.devices.findIndex(
      (device) => device.id === deviceId,
    );

    if (deviceIndex === -1) {
      throw new Error('Device not found');
    }

    gateway.devices.splice(deviceIndex, 1);
    return await gateway.save();
  }
}
