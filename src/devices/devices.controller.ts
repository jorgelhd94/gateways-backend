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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('Devices')
@ApiBearerAuth()
@Auth()
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post(':gatewayId')
  create(
    @Param('gatewayId', ParseMongoIdPipe) gatewayId: string,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.devicesService.create(gatewayId, createDeviceDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.devicesService.findAll(user);
  }

  @Get(':gatewayId')
  findAllByGateway(@Param('gatewayId', ParseMongoIdPipe) gatewayId: string) {
    return this.devicesService.findAllByGateway(gatewayId);
  }

  @Get(':gatewayId/:deviceId')
  findOneByGateway(
    @Param('gatewayId') gatewayId: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.devicesService.findOneByGateway(gatewayId, deviceId);
  }

  @Patch(':gatewayId/:deviceUID')
  update(
    @Param('gatewayId') gatewayId: string,
    @Param('deviceUID') deviceUID: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(gatewayId, +deviceUID, updateDeviceDto);
  }

  @Delete(':gatewayId/:deviceId')
  remove(
    @Param('gatewayId') gatewayId: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.devicesService.remove(gatewayId, deviceId);
  }
}
