import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device, DeviceSchema } from './schemas/device.schema';
import { GatewaysModule } from '../gateways/gateways.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    forwardRef(() => GatewaysModule),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [MongooseModule],
})
export class DevicesModule {}
