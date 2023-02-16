import { ParseMongoIdPipe } from './../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/schemas/user.schema';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Devices')
@ApiBearerAuth()
@Auth()
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiResponse({
    status: 201,
    description: 'The device has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'UID number is already register.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Post(':gatewayId')
  create(
    @Param('gatewayId', ParseMongoIdPipe) gatewayId: string,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.devicesService.create(gatewayId, createDeviceDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Find all devices of the current user.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Get()
  findAll(@GetUser() user: User) {
    return this.devicesService.findAll(user);
  }

  @ApiResponse({
    status: 201,
    description: 'Find all devices of a specified gateway.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Get(':gatewayId')
  findAllByGateway(@Param('gatewayId', ParseMongoIdPipe) gatewayId: string) {
    return this.devicesService.findAllByGateway(gatewayId);
  }

  @ApiResponse({
    status: 201,
    description: 'Find one device of a specified gateway.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Get(':gatewayId/:deviceId')
  findOneById(@Param('deviceId', ParseMongoIdPipe) deviceId: string) {
    return this.devicesService.findOneById(deviceId);
  }

  @ApiResponse({
    status: 201,
    description: 'The device has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'UID number is already register.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Patch(':gatewayId/:deviceId')
  update(
    @Param('gatewayId', ParseMongoIdPipe) gatewayId: string,
    @Param('deviceId', ParseMongoIdPipe) deviceId: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(gatewayId, deviceId, updateDeviceDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Delete one device.',
  })
  @ApiResponse({ status: 401, description: 'Not authorized.' })
  @Delete(':deviceId')
  remove(@Param('deviceId', ParseMongoIdPipe) deviceId: string) {
    return this.devicesService.remove(deviceId);
  }
}
