import { Model } from 'mongoose';
import { IGateway } from 'src/gateways/interfaces/gateway.interface';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Injectable } from '@nestjs/common';
import { Gateway, GatewayDocument } from 'src/gateways/schemas/gateway.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Gateway.name) private GatewayModel: Model<GatewayDocument>,
  ) {}

  async addDevice(
    gatewayId: string,
    device: CreateDeviceDto,
  ): Promise<IGateway> {
    const gateway = await this.GatewayModel.findById(gatewayId);

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
    const gateway = await this.GatewayModel.findById(gatewayId);

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
