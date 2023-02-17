import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IDevice } from './interfaces/device.interface';

const mockUser = {
  email: 'lolo@email.cu',
  fullname: 'Lolo',
  password: 'lolo123',
};

const mockGateway = {
  serialNumber: '123',
  name: 'asd',
  ipAddress: '10.0.1.1',
  _id: 'a id',
  devices: [],
};

const createDeviceDto: CreateDeviceDto = {
  uid: 123,
  vendor: 'asd',
  dateCreated: new Date('2023-12-12'),
  status: 'online',
};

const mockDevice = {
  uid: 123,
  vendor: 'asd',
  dateCreated: new Date('2023-12-12'),
  status: 'online',
};

const mockListDevices: IDevice[] = [
  {
    id: 'first id',
    uid: 123,
    vendor: 'asd',
    dateCreated: new Date('2023-12-12'),
    status: 'online',
    gatewayId: mockGateway,
  },
  {
    id: 'second id',
    uid: 456,
    vendor: 'dsa',
    dateCreated: new Date('2023-12-12'),
    status: 'online',
    gatewayId: mockGateway,
  },
];

describe('DevicesService', () => {
  let service: DevicesService;
  let model: Model<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DevicesService,
          useValue: {
            create: jest.fn().mockResolvedValue(createDeviceDto),
            findAll: jest.fn().mockResolvedValue(mockListDevices),
          },
        },
        {
          provide: getModelToken('Device'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockDevice),
            constructor: jest.fn().mockResolvedValue(mockDevice),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    model = module.get<Model<Device>>(getModelToken('Device'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new device', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockDevice));
    const newGateway = await service.create('a id', createDeviceDto);
    expect(newGateway).toEqual(mockDevice);
  });

  it('should return all devices', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockListDevices),
    } as any);
    const devices = await service.findAll(mockUser);
    expect(devices).toEqual(mockListDevices);
  });
});
