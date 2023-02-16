import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Device } from './../devices/schemas/device.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { Model } from 'mongoose';
import { Gateway } from './schemas/gateway.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('GatewaysController', () => {
  let controller: GatewaysController;

  const createGatewayDto: CreateGatewayDto = {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
  };

  const mockGateway = {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [
        {
          provide: GatewaysService,
          useValue: {
            create: jest.fn().mockResolvedValue(createGatewayDto),
          },
        },
      ],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
