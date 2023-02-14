import { UpdateDeviceDto } from './dto/update-device.dto';
import { Model } from 'mongoose';
import { IGateway } from 'src/gateways/interfaces/gateway.interface';
import { CreateDeviceDto } from './dto/create-device.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Gateway, GatewayDocument } from 'src/gateways/schemas/gateway.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IDevice } from './interfaces/device.interface';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Gateway.name) private GatewayModel: Model<GatewayDocument>,
  ) {}

  async create(gatewayId: string, device: CreateDeviceDto): Promise<IGateway> {
    const gateway = await this.GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    if (gateway.devices.length >= 10) {
      throw new BadRequestException(
        'Exceeded the maximum number of allowed devices',
      );
    }

    const existDevice = gateway.devices.find(
      (value) => value.uid === device.uid,
    );

    if (existDevice) {
      throw new BadRequestException(
        'Already exixts a device with the UID: ' + existDevice.uid,
      );
    }

    try {
      gateway.devices.push(device);
      const newDevice = await gateway.save();
      return newDevice;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(user: User): Promise<IDevice[]> {
    const gateways = (await this.GatewayModel.find({
      user,
    }).exec()) as any;

    const devicesList: IDevice[] = [];
    gateways.map((gateway: any) => {
      gateway.devices.map((device: any) => {
        devicesList.push({ ...device._doc, gatewayId: gateway._id });
      });
    });

    return devicesList;
  }

  async findAllByGateway(gatewayId): Promise<IDevice[]> {
    const gateway = await this.GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    return gateway.devices;
  }

  async findOneByGateway(
    gatewayId: string,
    deviceId: string,
  ): Promise<IDevice> {
    const gateway = await this.GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    const device = gateway.devices.find((device) => device.id === deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  async update(
    gatewayId: string,
    deviceUID: number,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<IGateway> {
    const gateway = await this.GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    const deviceIndex = gateway.devices.findIndex(
      (device) => device.uid === deviceUID,
    );

    if (deviceIndex === -1) {
      throw new NotFoundException('Device not found');
    }

    gateway.devices[deviceIndex] = updateDeviceDto;
    return await gateway.save();
  }

  async remove(gatewayId: string, deviceId: string): Promise<IGateway> {
    const gateway = await this.GatewayModel.findById(gatewayId);

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    const deviceIndex = gateway.devices.findIndex(
      (device) => device.id === deviceId,
    );

    if (deviceIndex === -1) {
      throw new NotFoundException('Device not found');
    }

    gateway.devices.splice(deviceIndex, 1);
    return await gateway.save();
  }

  private handleErrors(error: any): never {
    if (error.code === 11000)
      throw new BadRequestException('UID number is already register');
    throw new InternalServerErrorException('Internal Server Error');
  }
}
