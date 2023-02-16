import { forwardRef } from '@nestjs/common/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { Gateway, GatewaySchema } from './schemas/gateway.schema';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gateway.name, schema: GatewaySchema }]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [GatewaysController],
  providers: [GatewaysService],
  exports: [MongooseModule],
})
export class GatewaysModule {}
