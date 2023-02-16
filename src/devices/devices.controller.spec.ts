import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IDevice } from './interfaces/device.interface';

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;

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

  const mockDevice: IDevice = {
    id: 'other id',
    uid: 123,
    vendor: 'asd',
    dateCreated: new Date('2023-12-12'),
    status: 'online',
    gatewayId: mockGateway,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: {
            create: jest.fn().mockResolvedValue(createDeviceDto),
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

  // describe('findAll()', () => {
  //   it('should find all gateways by user', async () => {
  //     expect(controller.findAll(mockUser)).resolves.toEqual(mockListGateways);
  //     expect(service.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne()', () => {
  //   it('should find a gateway by id', async () => {
  //     expect(controller.findOne('a id')).resolves.toEqual(mockGateway);
  //     expect(service.findOne).toHaveBeenCalled();
  //   });
  // });

  // describe('update()', () => {
  //   it('should update a gateway by id', async () => {
  //     const updateSpy = jest
  //       .spyOn(service, 'update')
  //       .mockResolvedValueOnce(mockUpdatedGateway);

  //     await controller.update('a id', updateGatewayDto);
  //     expect(updateSpy).toHaveBeenCalledWith('a id', updateGatewayDto);
  //   });
  // });

  // describe('remove()', () => {
  //   it('should remove a gateway by id', async () => {
  //     expect(controller.remove('a id')).resolves.toEqual(mockGateway);
  //     expect(service.remove).toHaveBeenCalled();
  //   });
  // });
});
