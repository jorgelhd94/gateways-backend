import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { UpdateGatewayDto } from './dto/update-gateway.dto';

describe('GatewaysController', () => {
  let controller: GatewaysController;
  let service: GatewaysService;

  const createGatewayDto: CreateGatewayDto = {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
  };

  const updateGatewayDto: UpdateGatewayDto = {
    serialNumber: '12',
    ipAddress: '192.0.1.1',
  };

  const mockGateway = {
    serialNumber: '123',
    name: 'asd',
    ipAddress: '10.0.1.1',
    _id: 'a id',
    devices: [],
  };

  const mockUpdatedGateway = {
    serialNumber: '12',
    name: 'asd',
    ipAddress: '192.0.1.1',
    _id: 'a id',
    devices: [],
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

  const mockUser = {
    email: 'lolo@email.cu',
    fullname: 'Lolo',
    password: 'lolo123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [
        {
          provide: GatewaysService,
          useValue: {
            create: jest.fn().mockResolvedValue(createGatewayDto),
            findOne: jest.fn().mockResolvedValue(mockGateway),
            findAll: jest.fn().mockResolvedValue(mockListGateways),
            update: jest.fn().mockResolvedValue(updateGatewayDto),
            remove: jest.fn().mockResolvedValue(mockGateway),
          },
        },
      ],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
    service = module.get<GatewaysService>(GatewaysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new gateway', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockGateway);

      await controller.create(createGatewayDto, mockUser);
      expect(createSpy).toHaveBeenCalledWith(createGatewayDto, mockUser);
    });
  });

  describe('findAll()', () => {
    it('should find all gateways by user', async () => {
      expect(controller.findAll(mockUser)).resolves.toEqual(mockListGateways);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a gateway by id', async () => {
      expect(controller.findOne('a id')).resolves.toEqual(mockGateway);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update a gateway by id', async () => {
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(mockUpdatedGateway);

      await controller.update('a id', updateGatewayDto);
      expect(updateSpy).toHaveBeenCalledWith('a id', updateGatewayDto);
    });
  });

  describe('remove()', () => {
    it('should remove a gateway by id', async () => {
      expect(controller.remove('a id')).resolves.toEqual(mockGateway);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
