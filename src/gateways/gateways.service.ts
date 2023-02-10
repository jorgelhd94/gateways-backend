import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { IGateway } from './interfaces/gateway.interface';
import { GatewayDocument, GatewayModel } from './schemas/gateway.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GatewaysService {
  constructor(
    @InjectModel(GatewayModel.name)
    private gatewayModel: Model<GatewayDocument>,
  ) {}

  async create(gateway: CreateGatewayDto): Promise<IGateway> {
    const createdGateway = new this.gatewayModel(gateway);
    return createdGateway.save();
  }

  async findAll(): Promise<IGateway[]> {
    return this.gatewayModel.find().exec();
  }

  async findOne(id: string): Promise<IGateway> {
    return this.gatewayModel.findById(id).exec();
  }

  async update(id: string, gateway: UpdateGatewayDto): Promise<IGateway> {
    return this.gatewayModel
      .findByIdAndUpdate(id, gateway, { new: true })
      .exec();
  }

  async remove(id: string): Promise<IGateway> {
    return this.gatewayModel.findByIdAndRemove(id).exec();
  }
}
