import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { GatewaysModule } from 'src/gateways/gateways.module';

@Module({
  imports: [GatewaysModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
