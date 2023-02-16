import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { IGateway } from './interfaces/gateway.interface';
import { Gateway, GatewayDocument } from './schemas/gateway.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Device, DeviceDocument } from '../devices/schemas/device.schema';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(Gateway.name) private GatewayModel: Model<GatewayDocument>,
    @InjectModel(Device.name) private DeviceModel: Model<DeviceDocument>,
  ) {}

  async create(gateway: CreateGatewayDto, user: User): Promise<IGateway> {
    try {
      const newGateway = {
        user,
        ...gateway,
      };
      const createdGateway = new this.GatewayModel(newGateway);
      const result = await createdGateway.save();
      return result;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(user: User): Promise<IGateway[]> {
    return this.GatewayModel.find({ user })
      .populate('devices', null, Device.name)
      .exec();
  }

  async findOne(id: string): Promise<IGateway> {
    return this.GatewayModel.findById(id)
      .populate('devices', null, Device.name)
      .exec();
  }

  async update(id: string, gateway: UpdateGatewayDto): Promise<IGateway> {
    try {
      const result = await this.GatewayModel.findByIdAndUpdate(id, gateway, {
        new: true,
      }).exec();

      return result;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string): Promise<IGateway> {
    await this.DeviceModel.deleteMany({ gatewayId: id });
    return this.GatewayModel.findByIdAndRemove(id).exec();
  }

  private handleErrors(error: any): never {
    if (error.code === 11000)
      throw new BadRequestException('Serial number is already register');
    throw new InternalServerErrorException('Internal Server Error');
  }
}
