import { UpdateDeviceDto } from './dto/update-device.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IDevice } from './interfaces/device.interface';

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;

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

  const updateDeviceDto: UpdateDeviceDto = {
    vendor: 'asd1',
    status: 'offline',
  };

  const mockDevice: IDevice = {
    id: 'other id',
    uid: 123,
    vendor: 'asd',
    dateCreated: new Date('2023-12-12'),
    status: 'online',
    gatewayId: mockGateway,
  };

  const mockUpdatedDevice: IDevice = {
    id: 'other id',
    uid: 123,
    vendor: 'asd1',
    dateCreated: new Date('2023-12-12'),
    status: 'offline',
    gatewayId: mockGateway,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: {
            create: jest.fn().mockResolvedValue(createDeviceDto),
            findAll: jest.fn().mockResolvedValue(mockListDevices),
            findAllByGateway: jest.fn().mockResolvedValue(mockListDevices),
            findOneById: jest.fn().mockResolvedValue(mockDevice),
            update: jest.fn().mockResolvedValue(updateDeviceDto),
            remove: jest.fn().mockResolvedValue(mockDevice),
          },
        },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new device', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockDevice);

      await controller.create('a id', createDeviceDto);
      expect(createSpy).toHaveBeenCalledWith('a id', createDeviceDto);
    });
  });

  describe('findAll()', () => {
    it('should find all devices by user', async () => {
      expect(controller.findAll(mockUser)).resolves.toEqual(mockListDevices);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllByGateway()', () => {
    it('should find all devices by gateway', async () => {
      expect(controller.findAllByGateway('a id')).resolves.toEqual(
        mockListDevices,
      );
      expect(service.findAllByGateway).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a gateway by id', async () => {
      expect(controller.findOneById('other id')).resolves.toEqual(mockDevice);
      expect(service.findOneById).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a device by gateway and device ids', async () => {
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(mockUpdatedDevice);

      await controller.update('a id', 'other id', updateDeviceDto);
      expect(updateSpy).toHaveBeenCalledWith(
        'a id',
        'other id',
        updateDeviceDto,
      );
    });
  });

  describe('remove()', () => {
    it('should remove a device by id', async () => {
      expect(controller.remove('other id')).resolves.toEqual(mockDevice);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
