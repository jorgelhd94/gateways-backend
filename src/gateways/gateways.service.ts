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
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(Gateway.name) private GatewayModel: Model<GatewayDocument>,
  ) {}

  async create(gateway: CreateGatewayDto, user: User): Promise<IGateway> {
    try {
      const newGateway = {
        user,
        ...gateway,
      };
      const createdGateway = new this.GatewayModel(newGateway);
      return createdGateway.save();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(user: User): Promise<IGateway[]> {
    return this.GatewayModel.find({ user }).exec();
  }

  async findOne(id: string): Promise<IGateway> {
    return this.GatewayModel.findById(id).exec();
  }

  async update(id: string, gateway: UpdateGatewayDto): Promise<IGateway> {
    return this.GatewayModel.findByIdAndUpdate(id, gateway, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<IGateway> {
    return this.GatewayModel.findByIdAndRemove(id).exec();
  }

  private handleErrors(error: any): never {
    console.log(error.code);
    if (error.code === 11000)
      throw new BadRequestException('Serial number is already register');
    throw new InternalServerErrorException('Internal Server Error');
  }
}
