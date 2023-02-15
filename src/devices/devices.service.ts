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
import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Gateway.name) private GatewayModel: Model<GatewayDocument>,
    @InjectModel(Device.name) private DeviceModel: Model<DeviceDocument>,
  ) {}

  async create(gatewayId: string, device: CreateDeviceDto): Promise<IDevice> {
    const gateway = await this.GatewayModel.findById(gatewayId).exec();

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    const devices = await this.findAllByGateway(gatewayId);
    if (devices.length >= 10) {
      throw new BadRequestException(
        'Exceeded the maximum number of allowed devices',
      );
    }
    const existDevice = devices.find((value) => value.uid === device.uid);

    if (existDevice) {
      throw new BadRequestException(
        'Already exixts a device with the UID: ' + existDevice.uid,
      );
    }

    try {
      const createdDevice = new this.DeviceModel({ ...device, gatewayId });
      const result = await createdDevice.save();
      await this.GatewayModel.findByIdAndUpdate(
        gatewayId,
        {
          $addToSet: { devices: result._id },
        },
        { new: true },
      );
      return result;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(user: User): Promise<IDevice[]> {
    const gateways = await this.GatewayModel.find({
      user,
    })
      .populate('devices', null, Device.name)
      .exec();

    const devices = [];
    gateways.map((gateway) => {
      devices.push(...gateway.devices);
    });

    return devices;
  }

  async findAllByGateway(gatewayId): Promise<IDevice[]> {
    const gateway = await this.GatewayModel.findById(gatewayId).exec();

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    return await this.DeviceModel.find({ gateway }).exec();
  }

  async findOneById(deviceId: string): Promise<IDevice> {
    return this.DeviceModel.findById(deviceId).exec();
  }

  async update(
    gatewayId: string,
    deviceId: string,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<IDevice> {
    return this.DeviceModel.findByIdAndUpdate(
      deviceId,
      { ...updateDeviceDto, gateway: gatewayId },
      {
        new: true,
      },
    ).exec();
  }

  async remove(deviceId: string): Promise<IDevice> {
    return await this.DeviceModel.findByIdAndRemove(deviceId).exec();
  }

  private handleErrors(error: any): never {
    if (error.code === 11000)
      throw new BadRequestException('UID number is already register');
    throw new InternalServerErrorException('Internal Server Error');
  }
}
