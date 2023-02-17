import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysService } from './gateways.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway } from './schemas/gateway.schema';
import { CreateGatewayDto } from './dto/create-gateway.dto';

const mockUser = {
  email: 'lolo@email.cu',
  fullname: 'Lolo',
  password: 'lolo123',
};

const mockGateway = {
  serialNumber: '123',
  name: 'asd',
  ipAddress: '10.0.1.1',
};

const mockListGateways = [
  {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
    _id: 'a id',
    devices: [],
  },
  {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
    _id: 'a id',
    devices: [],
  },
];

const createGatewayDto: CreateGatewayDto = {
  serialNumber: '123',
  name: 'asd',
  ipAddress: '10.0.1.1',
};

describe('GatewaysService', () => {
  let service: GatewaysService;
  let model: Model<Gateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GatewaysService,
          useValue: {
            create: jest.fn().mockResolvedValue(createGatewayDto),
            findAll: jest.fn().mockResolvedValue(mockListGateways),
          },
        },
        {
          provide: getModelToken('Gateway'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockGateway),
            constructor: jest.fn().mockResolvedValue(mockGateway),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GatewaysService>(GatewaysService);
    model = module.get<Model<Gateway>>(getModelToken('Gateway'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new gateway', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockGateway));
    const newGateway = await service.create(createGatewayDto, mockUser);
    expect(newGateway).toEqual(mockGateway);
  });

  it('should return all gateways', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockListGateways),
    } as any);
    const gateways = await service.findAll(mockUser);
    expect(gateways).toEqual(mockListGateways);
  });
});
